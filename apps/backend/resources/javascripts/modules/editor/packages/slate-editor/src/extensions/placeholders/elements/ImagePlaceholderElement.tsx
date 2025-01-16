import type { ImageNode } from '@prezly/slate-types';
import {
    type PrezlyFileInfo,
    toProgressPromise,
    UPLOADCARE_FILE_DATA_KEY,
    UploadcareImage,
} from '@prezly/uploadcare';
import uploadcare, { type FilePromise } from '@prezly/uploadcare-widget';
import { useEditorRef, useSelected } from '@udecode/plate/react';
import React, { type DragEventHandler } from 'react';

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
import type { WithMediaGalleryTab } from '../types';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'onDrop'> {
    element: PlaceholderNode<PlaceholderNode.Type.IMAGE>;
    withCaptions: boolean;
    withMediaGalleryTab: WithMediaGalleryTab;
}

export function ImagePlaceholderElement({
    children,
    element,
    format = '16:9',
    withCaptions,
    withMediaGalleryTab,
    ...props
}: Props) {
    const editor = useEditorRef();
    const isSelected = useSelected();

    function processSelectedImages(images: FilePromise[]) {
        const placeholders = [
            element,
            ...insertPlaceholders(editor, images.length - 1, {
                type: element.type,
            }),
        ];

        images.forEach((filePromise, i) => {
            const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
                if (!fileInfo.isImage) {
                    // This should never happen, as there are checks in functions preceding this callback.
                    // @see `imagesOnly` flag in `handleClick()`
                    // @see `IMAGE_TYPES` filter in `handleDrop()`
                    throw new Error('Uploaded file is not an image.');
                }

                const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return {
                    image: createImage({
                        file: image.toPrezlyStoragePayload(),
                        children: [{ text: caption }],
                    }),
                    operation: 'add' as const,
                    trigger: 'placeholder' as const,
                };
            });
            PlaceholdersManager.register(element.type, placeholders[i].uuid, uploading);
        });
    }

    const handleClick = useFunction(async () => {
        const images = await UploadcareEditor.upload(editor, {
            ...withGalleryTabMaybe(withMediaGalleryTab),
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
        (data: { image: ImageNode; operation: 'add' | 'replace' | 'crop'; trigger: string }) => {
            const node = createImage(data.image);
            replacePlaceholder(editor, element, node, { select: isSelected });

            const event = data.operation === 'add' ? 'image-added' : 'image-edited';
            EventsEditor.dispatchEvent(editor, event, {
                description: editor.api.string(node),
                isPasted: false,
                mimeType: node.file.mime_type,
                size: node.file.size,
                uuid: node.file.uuid,
                operation: data.operation,
                trigger: data.trigger,
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
