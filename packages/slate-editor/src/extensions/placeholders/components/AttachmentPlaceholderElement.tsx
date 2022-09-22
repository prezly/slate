import type { AttachmentNode } from '@prezly/slate-types';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderAttachment } from '#icons';
import { useFunction } from '#lib';

import { createFileAttachment } from '#extensions/file-attachment';
import { UploadcareEditor } from '#modules/uploadcare';

import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManager } from '../PlaceholdersManager';

import { PlaceholderElement, type Props as BaseProps } from './PlaceholderElement';

import { insertPlaceholders, replacePlaceholder } from '#extensions/placeholders/lib';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'dropZone'> {
    element: PlaceholderNode;
}

export function AttachmentPlaceholderElement({ children, element, ...props }: Props) {
    const editor = useSlateStatic();

    const handleClick = useFunction(async () => {
        const filePromises =
            (await UploadcareEditor.upload(editor, {
                captions: true,
                multiple: true,
            })) ?? [];

        const placeholders = [
            element,
            ...insertPlaceholders(editor, filePromises.length - 1, {
                type: PlaceholderNode.Type.ATTACHMENT,
            }),
        ];

        filePromises.forEach((filePromise, i) => {
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
    });

    const handleUpload = useFunction((data: { file: AttachmentNode['file']; caption: string }) => {
        replacePlaceholder(editor, element, createFileAttachment(data.file, data.caption));
    });

    usePlaceholderManager(PlaceholderNode.Type.ATTACHMENT, element.uuid, {
        onResolve: handleUpload,
    });

    return (
        <PlaceholderElement
            {...props}
            element={element}
            // Core
            icon={PlaceholderAttachment}
            title={Title}
            description={Description}
            dropZone
            // Callbacks
            onClick={handleClick}
        >
            {children}
        </PlaceholderElement>
    );
}

function Title(props: { isDragOver: boolean; isLoading: boolean }) {
    if (props.isLoading) {
        return 'Uploading file';
    }
    if (props.isDragOver) {
        return 'Drop a file here';
    }
    return 'Drag or click to upload an attachment';
}

function Description() {
    return 'Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB';
}
