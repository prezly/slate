import type { GalleryNode } from '@prezly/slate-types';
import { awaitUploads, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import type { FilePromise } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';
import type { DragEventHandler } from 'react';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderGallery } from '#icons';
import { useFunction } from '#lib';

import { createGallery } from '#extensions/galleries';
import { IMAGE_TYPES } from '#extensions/image';
import { EventsEditor } from '#modules/events';
import { UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE, UploadcareEditor } from '#modules/uploadcare';

import { PlaceholderElement, type Props as BaseProps } from '../components/PlaceholderElement';
import { replacePlaceholder } from '../lib';
import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'dropZone'> {
    element: PlaceholderNode;
}

export function GalleryPlaceholderElement({ children, element, ...props }: Props) {
    const editor = useSlateStatic();

    function processSelectedImages(images: FilePromise[]) {
        if (images.length === 0) return;

        const uploading = awaitUploads(images)
            .then(({ failedUploads, successfulUploads }) => {
                failedUploads.forEach((error) => {
                    EventsEditor.dispatchEvent(editor, 'error', error);
                });

                if (failedUploads.length > 0) {
                    EventsEditor.dispatchEvent(editor, 'notification', {
                        children: UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE,
                        type: 'error',
                    });
                }

                return successfulUploads;
            })
            .then((fileInfos) => {
                const images = fileInfos.map((fileInfo) => {
                    const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                    return {
                        caption: fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
                        file: image.toPrezlyStoragePayload(),
                    };
                });
                return { images };
            });

        PlaceholdersManager.register(PlaceholderNode.Type.GALLERY, element.uuid, uploading);
    }

    const handleClick = useFunction(async () => {
        const images = await UploadcareEditor.upload(editor, {
            captions: true, // FIXME
            imagesOnly: true,
            multiple: true,
        });
        processSelectedImages(images ?? []);
    });

    const handleDrop = useFunction<DragEventHandler>((event) => {
        const images = Array.from(event.dataTransfer.files)
            .filter((file) => IMAGE_TYPES.includes(file.type))
            .map((file) => uploadcare.fileFrom('object', file));
        processSelectedImages(images);
    });

    const handleUploadedImages = useFunction((data: { images: GalleryNode['images'] }) => {
        replacePlaceholder(editor, element, createGallery({ images: data.images }));
    });

    usePlaceholderManagement(PlaceholderNode.Type.GALLERY, element.uuid, {
        onTrigger: handleClick,
        onResolve: handleUploadedImages,
    });

    return (
        <PlaceholderElement
            {...props}
            element={element}
            // Core
            format="16:9"
            icon={PlaceholderGallery}
            title={Title}
            description="Supported formats: .jpg, .gif, or .png - Max. 25MB"
            dropZone
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
        return <>Uploading images</>;
    }
    if (props.isDragOver) {
        return <>Drop images here</>;
    }
    return <>Drag or click to upload multiple images</>;
}
