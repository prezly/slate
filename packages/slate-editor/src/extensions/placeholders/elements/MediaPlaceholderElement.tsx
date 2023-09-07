import type { NewsroomRef } from '@prezly/sdk';
import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout } from '@prezly/slate-types';
import {
    type PrezlyFileInfo,
    toProgressPromise,
    UPLOADCARE_FILE_DATA_KEY,
    UploadcareImage,
} from '@prezly/uploadcare';
import uploadcare, { type FilePromise } from '@prezly/uploadcare-widget';
import React, { type DragEventHandler } from 'react';
import { useSelected, useSlateStatic } from 'slate-react';

import { PlaceholderImage } from '#icons';
import { useFunction } from '#lib';

import { createImage, IMAGE_TYPES } from '#extensions/image';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';

import { withLoadingDots } from '../components/LoadingDots';
import { PlaceholderElement, type Props as BaseProps } from '../components/PlaceholderElement';
import { replacePlaceholder, withGalleryTabMaybe } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'onDrop'> {
    element: PlaceholderNode<PlaceholderNode.Type.MEDIA>;
    newsroom: NewsroomRef | undefined;
    withCaptions: boolean;
}

type Data = {
    media: {
        type: 'image';
        file: ImageNode['file'];
        caption: string;
    };
};

export function MediaPlaceholderElement({
    children,
    element,
    format = 'card',
    newsroom,
    removable,
    withCaptions,
    ...props
}: Props) {
    const editor = useSlateStatic();
    const isSelected = useSelected();

    function processSelectedImage(image: FilePromise) {
        const uploading = toProgressPromise(image).then((fileInfo: PrezlyFileInfo) => {
            const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
            const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
            return {
                media: {
                    type: 'image' as const,
                    file: image.toPrezlyStoragePayload(),
                    caption: String(caption),
                },
            };
        });
        PlaceholdersManager.register(element.type, element.uuid, uploading);
    }

    const handleClick = useFunction(async () => {
        const images = await UploadcareEditor.upload(editor, {
            ...withGalleryTabMaybe(newsroom),
            captions: withCaptions,
            imagesOnly: true,
            multiple: false,
        });
        if (images) {
            processSelectedImage(images[0]);
        }
    });

    const handleDrop = useFunction<DragEventHandler>((event) => {
        event.preventDefault();
        event.stopPropagation();
        const images = Array.from(event.dataTransfer.files)
            .filter((file) => IMAGE_TYPES.includes(file.type))
            .slice(0, 1)
            .map((file) => uploadcare.fileFrom('object', file));

        if (images.length > 0) {
            processSelectedImage(images[0]);
        }
    });

    const handleUploadedImage = useFunction((data: Data) => {
        if (data.media.type === 'image') {
            const { file, caption } = data.media;
            replacePlaceholder(
                editor,
                element,
                createImage({
                    file,
                    children: [{ text: caption }],
                    layout: ImageLayout.CONTAINED,
                }),
                { select: isSelected },
            );

            EventsEditor.dispatchEvent(editor, 'image-added', {
                description: caption,
                isPasted: false,
                mimeType: file.mime_type,
                size: file.size,
                uuid: file.uuid,
            });
        }
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleClick,
        onResolve: handleUploadedImage,
    });

    return (
        <PlaceholderElement
            {...props}
            element={element}
            // Core
            format={format}
            removable={removable}
            icon={PlaceholderImage}
            title={Title}
            description={Description}
            // Callbacks
            onClick={handleClick}
            onDrop={handleDrop}
        >
            {children}
        </PlaceholderElement>
    );
}

function Title(props: { isDragOver: boolean; isLoading: boolean }) {
    if (props.isLoading) {
        return <>{withLoadingDots('Uploading images')}</>;
    }
    if (props.isDragOver) {
        return <>Drop an image here</>;
    }
    return <>Drag or click to upload a header image</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Now more configurable. Supports formats: JPG, GIF or PNG (max 25MB)</>;
}
