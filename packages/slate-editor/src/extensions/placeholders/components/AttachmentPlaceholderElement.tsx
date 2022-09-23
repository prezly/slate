import type { AttachmentNode } from '@prezly/slate-types';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import type { FilePromise } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';
import type { DragEventHandler } from 'react';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderAttachment } from '#icons';
import { useFunction } from '#lib';

import { createFileAttachment } from '#extensions/file-attachment';
import { UploadcareEditor } from '#modules/uploadcare';

import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

import { PlaceholderElement, type Props as BaseProps } from './PlaceholderElement';

import { insertPlaceholders, replacePlaceholder } from '#extensions/placeholders/lib';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'dropZone'> {
    element: PlaceholderNode;
}

export function AttachmentPlaceholderElement({ children, element, ...props }: Props) {
    const editor = useSlateStatic();

    function processSelectedFiles(files: FilePromise[]) {
        const placeholders = [
            element,
            ...insertPlaceholders(editor, files.length - 1, {
                type: PlaceholderNode.Type.ATTACHMENT,
            }),
        ];

        files.forEach((filePromise, i) => {
            const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
                const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return { file: file.toPrezlyStoragePayload(), caption };
            });
            PlaceholdersManager.register(
                PlaceholderNode.Type.ATTACHMENT,
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
        processSelectedFiles(files ?? []);
    });

    const handleDrop = useFunction<DragEventHandler>((event) => {
        const files = Array.from(event.dataTransfer.files).map((file) =>
            uploadcare.fileFrom('object', file),
        );
        processSelectedFiles(files);
    });

    const handleUploadedFile = useFunction(
        (data: { file: AttachmentNode['file']; caption: string }) => {
            replacePlaceholder(editor, element, createFileAttachment(data.file, data.caption));
        },
    );

    usePlaceholderManagement(PlaceholderNode.Type.ATTACHMENT, element.uuid, {
        onTrigger: handleClick,
        onResolve: handleUploadedFile,
    });

    return (
        <PlaceholderElement
            {...props}
            element={element}
            // Core
            icon={PlaceholderAttachment}
            title={Title}
            description="Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB"
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
        return <>Uploading file</>;
    }
    if (props.isDragOver) {
        return <>Drop a file here</>;
    }
    return <>Drag or click to upload an attachment</>;
}
