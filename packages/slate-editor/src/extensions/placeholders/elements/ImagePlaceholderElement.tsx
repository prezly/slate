import type { NewsroomRef } from '@prezly/sdk';
import type { ImageNode } from '@prezly/slate-types';
import {
    type PrezlyFileInfo,
    toProgressPromise,
    UPLOADCARE_FILE_DATA_KEY,
    UploadcareImage,
} from '@prezly/uploadcare';
import uploadcare, { type FilePromise } from '@prezly/uploadcare-widget';
import React, { type DragEventHandler } from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderImage } from '#icons';
import { useFunction } from '#lib';

import { createImage, IMAGE_TYPES } from '#extensions/image';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';

import { withLoadingDots } from '../components/LoadingDots';
import { PlaceholderElement, type Props as BaseProps } from '../components/PlaceholderElement';
import { insertPlaceholders, replacePlaceholder, withGalleryTabMaybe } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'onDrop'> {
    element: PlaceholderNode<PlaceholderNode.Type.IMAGE>;
    newsroom: NewsroomRef | undefined;
    withCaptions: boolean;
}

export function ImagePlaceholderElement({
    children,
    element,
    format = '16:9',
    newsroom,
    withCaptions,
    ...props
}: Props) {
    const editor = useSlateStatic();

    function processSelectedImages(images: FilePromise[]) {
        const placeholders = [
            element,
            ...insertPlaceholders(editor, images.length - 1, {
                type: element.type,
            }),
        ];

        images.forEach((filePromise, i) => {
            const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
                const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return { file: image.toPrezlyStoragePayload(), caption, operation: 'add' } as const;
            });
            PlaceholdersManager.register(element.type, placeholders[i].uuid, uploading);
        });
    }

    const handleClick = useFunction(async () => {
        const images = await UploadcareEditor.upload(editor, {
            ...withGalleryTabMaybe(newsroom),
            captions: withCaptions,
            imagesOnly: true,
            multiple: true,
        });
        processSelectedImages(images ?? []);
    });

    const handleDrop = useFunction<DragEventHandler>((event) => {
        event.preventDefault();
        event.stopPropagation();
        const images = Array.from(event.dataTransfer.files)
            .filter((file) => IMAGE_TYPES.includes(file.type))
            .map((file) => uploadcare.fileFrom('object', file));
        processSelectedImages(images);
    });

    const handleUploadedImage = useFunction(
        (data: { file: ImageNode['file']; caption: string; operation: 'add' | 'edit' }) => {
            replacePlaceholder(
                editor,
                element,
                createImage({
                    file: data.file,
                    children: [{ text: data.caption }],
                }),
            );

            const event = data.operation === 'edit' ? 'image-edited' : 'image-added';
            EventsEditor.dispatchEvent(editor, event, {
                description: data.caption,
                isPasted: false,
                mimeType: data.file.mime_type,
                size: data.file.size,
                uuid: data.file.uuid,
            });
        },
    );

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
    return <>Drag or click to upload an image</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Supported formats: JPG, GIF or PNG (max 25MB)</>;
}
