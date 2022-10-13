import type { NewsroomRef } from '@prezly/sdk';
import type { GalleryNode } from '@prezly/slate-types';
import { awaitUploads, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import uploadcare, { type FilePromise } from '@prezly/uploadcare-widget';
import React, { type DragEventHandler } from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderGallery } from '#icons';
import { useFunction } from '#lib';

import { createGallery } from '#extensions/galleries';
import { IMAGE_TYPES } from '#extensions/image';
import { EventsEditor } from '#modules/events';
import { UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE, UploadcareEditor } from '#modules/uploadcare';

import { withLoadingDots } from '../components/LoadingDots';
import { PlaceholderElement, type Props as BaseProps } from '../components/PlaceholderElement';
import { replacePlaceholder, withGalleryTabMaybe } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'onDrop'> {
    element: PlaceholderNode<PlaceholderNode.Type.GALLERY>;
    newsroom: NewsroomRef | undefined;
    withCaptions: boolean;
}

export function GalleryPlaceholderElement({
    children,
    element,
    newsroom,
    withCaptions,
    ...props
}: Props) {
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

        PlaceholdersManager.register(element.type, element.uuid, uploading);
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

    const handleUploadedImages = useFunction((data: { images: GalleryNode['images'] }) => {
        replacePlaceholder(editor, element, createGallery({ images: data.images }));
    });

    usePlaceholderManagement(element.type, element.uuid, {
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
        return <>Drop images here</>;
    }
    return <>Drag or click to upload multiple images</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Supported formats: JPG, GIF or PNG (max 25MB)</>;
}
