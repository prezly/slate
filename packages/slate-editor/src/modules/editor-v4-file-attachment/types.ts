import { UploadcareStoragePayload } from '@prezly/uploadcare';
import { RefObject } from 'react';
import { Editor, Element } from 'slate';

import { FILE_ATTACHMENT_TYPE } from './constants';

export type FileAttachmentType = typeof FILE_ATTACHMENT_TYPE;

export interface FileAttachmentElementType extends Element {
    description: string;
    file: UploadcareStoragePayload;
    type: FileAttachmentType;
}

export interface FileAttachmentExtensionParameters {
    styled: boolean;
}

export interface FileAttachmentParameters extends FileAttachmentExtensionParameters {
    containerRef: RefObject<HTMLElement>;
    onEdit?: (editor: Editor) => void;
    onRemove?: (editor: Editor, element: FileAttachmentElementType) => void;
}
