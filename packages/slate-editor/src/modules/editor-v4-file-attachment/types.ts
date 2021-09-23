import { AttachmentNode } from '@prezly/slate-types';
import { RefObject } from 'react';
import { Editor } from 'slate';

import { FILE_ATTACHMENT_TYPE } from './constants';

export type FileAttachmentType = typeof FILE_ATTACHMENT_TYPE;

export interface FileAttachmentExtensionParameters {
    styled: boolean;
}

export interface FileAttachmentParameters extends FileAttachmentExtensionParameters {
    containerRef: RefObject<HTMLElement>;
    onEdit?: (editor: Editor) => void;
    onRemove?: (editor: Editor, element: AttachmentNode) => void;
}
