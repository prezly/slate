import type { AttachmentNode } from '@prezly/slate-types';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareFile } from '@prezly/uploadcare';
import type { PrezlyFileInfo } from '@prezly/uploadcare';
import type { FilePromise } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';
import type { DragEventHandler } from 'react';
import React from 'react';
import { useSelected, useSlateStatic } from 'slate-react';

import { PlaceholderAttachment } from '#icons';
import { useFunction } from '#lib';

import { createFileAttachment } from '#extensions/file-attachment';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';

import { withLoadingDots } from '../components/LoadingDots';
import { PlaceholderElement, type Props as BaseProps } from '../components/PlaceholderElement';
import { insertPlaceholders, replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

interface Props extends Omit<BaseProps, 'icon' | 'title' | 'description' | 'onDrop'> {
    element: PlaceholderNode<PlaceholderNode.Type.ATTACHMENT>;
}

export function AttachmentPlaceholderElement({ children, element, ...props }: Props) {
    const editor = useSlateStatic();
    const isSelected = useSelected();

    function processSelectedFiles(files: FilePromise[]) {
        const placeholders = [
            element,
            ...insertPlaceholders(editor, files.length - 1, {
                type: element.type,
            }),
        ];

        files.forEach((filePromise, i) => {
            const uploading = toProgressPromise(filePromise).then((fileInfo: PrezlyFileInfo) => {
                const file = UploadcareFile.createFromUploadcareWidgetPayload(fileInfo);
                const caption = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return {
                    file: file.toPrezlyStoragePayload(),
                    caption,
                    trigger: 'placeholder' as const,
                };
            });
            PlaceholdersManager.register(element.type, placeholders[i].uuid, uploading);
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
        event.preventDefault();
        event.stopPropagation();
        const files = Array.from(event.dataTransfer.files).map((file) =>
            uploadcare.fileFrom('object', file),
        );
        processSelectedFiles(files);
    });

    const handleUploadedFile = useFunction(
        (data: { file: AttachmentNode['file']; caption: string; trigger: string }) => {
            replacePlaceholder(editor, element, createFileAttachment(data.file, data.caption), {
                select: isSelected,
            });

            EventsEditor.dispatchEvent(editor, 'attachment-added', {
                description: data.caption,
                isPasted: false,
                mimeType: data.file.mime_type,
                size: data.file.size,
                uuid: data.file.uuid,
                trigger: data.trigger,
            });
        },
    );

    usePlaceholderManagement(element.type, element.uuid, {
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
        return <>{withLoadingDots('Uploading attachment')}</>;
    }
    if (props.isDragOver) {
        return <>Drop a file here</>;
    }
    return <>Drag or click to upload an attachment</>;
}

function Description(props: { isLoading: boolean }) {
    if (props.isLoading) {
        return null;
    }
    return <>Supported formats: PDF, PPT, Keynote, ZIP, DOC, and more (max 720MB)</>;
}
