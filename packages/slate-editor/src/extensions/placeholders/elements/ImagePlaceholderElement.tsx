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

import { PlaceholderElement, type Props as BaseProps } from '../components/PlaceholderElement';
import { insertPlaceholders, replacePlaceholder, withGalleryTabMaybe } from '../lib';
import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'onDrop'> {
    element: PlaceholderNode;
    newsroom: NewsroomRef | undefined;
}

export function ImagePlaceholderElement({ children, element, newsroom, ...props }: Props) {
    const editor = useSlateStatic();

    function processSelectedImages(images: FilePromise[]) {
        const placeholders = [
            element,
            ...insertPlaceholders(editor, images.length - 1, {
                type: PlaceholderNode.Type.IMAGE,
            }),
        ];

        images.forEach((filePromise, i) => {
            const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
                const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return { file: image.toPrezlyStoragePayload(), caption };
            });
            PlaceholdersManager.register(
                PlaceholderNode.Type.IMAGE,
                placeholders[i].uuid,
                uploading,
            );
        });
    }

    const handleClick = useFunction(async () => {
        const images = await UploadcareEditor.upload(editor, {
            ...withGalleryTabMaybe(newsroom),
            captions: true, // FIXME
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
        (data: { file: ImageNode['file']; caption: string }) => {
            replacePlaceholder(
                editor,
                element,
                createImage({
                    file: data.file,
                    children: [{ text: data.caption }],
                }),
            );

            EventsEditor.dispatchEvent(editor, 'image-added', {
                description: data.caption,
                isPasted: false,
                mimeType: data.file.mime_type,
                size: data.file.size,
                uuid: data.file.uuid,
            });
        },
    );

    usePlaceholderManagement(PlaceholderNode.Type.IMAGE, element.uuid, {
        onTrigger: handleClick,
        onResolve: handleUploadedImage,
    });

    return (
        <PlaceholderElement
            {...props}
            element={element}
            // Core
            format="16:9"
            icon={PlaceholderImage}
            title={Title}
            description="Supported formats: .jpg, .gif, or .png - Max. 25MB"
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
        return <>Uploading image</>;
    }
    if (props.isDragOver) {
        return <>Drop an image here</>;
    }
    return <>Drag or click to upload an image</>;
}
