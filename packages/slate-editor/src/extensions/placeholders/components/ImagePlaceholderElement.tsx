import type { ImageNode } from '@prezly/slate-types';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import type { FilePromise } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';
import type { DragEventHandler } from 'react';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderImage } from '#icons';
import { useFunction } from '#lib';

import { UploadcareEditor } from '#modules/uploadcare';

import { createImage } from '../../image';
import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

import { PlaceholderElement, type Props as BaseProps } from './PlaceholderElement';

import { insertPlaceholders, replacePlaceholder } from '#extensions/placeholders/lib';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'dropZone'> {
    element: PlaceholderNode;
}

export function ImagePlaceholderElement({ children, element, ...props }: Props) {
    const editor = useSlateStatic();

    function processSelectedImages(files: FilePromise[]) {
        const placeholders = [
            element,
            ...insertPlaceholders(editor, files.length - 1, {
                type: PlaceholderNode.Type.IMAGE,
            }),
        ];

        files.forEach((filePromise, i) => {
            const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
                const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return { file: file.toPrezlyStoragePayload(), caption };
            });
            PlaceholdersManager.register(
                PlaceholderNode.Type.IMAGE,
                placeholders[i].uuid,
                uploading,
            );
        });
    }

    const handleClick = useFunction(async () => {
        const files = await UploadcareEditor.upload(editor, {
            captions: true,
            multiple: true,
        });
        processSelectedImages(files ?? []);
    });

    const handleDrop = useFunction<DragEventHandler>((event) => {
        const files = Array.from(event.dataTransfer.files).map((file) =>
            uploadcare.fileFrom('object', file),
        );
        processSelectedImages(files);
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
            icon={PlaceholderImage}
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
        return <>Uploading image</>;
    }
    if (props.isDragOver) {
        return <>Drop an image here</>;
    }
    return <>Drag or click to upload an image</>;
}
