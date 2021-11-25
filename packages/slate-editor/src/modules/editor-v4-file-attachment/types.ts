import type { AttachmentNode } from '@prezly/slate-types';
import type { RefObject } from 'react';
import type { Editor } from 'slate';

export interface FileAttachmentExtensionParameters {
    styled: boolean;
}

export interface FileAttachmentParameters extends FileAttachmentExtensionParameters {
    containerRef: RefObject<HTMLElement>;
    onEdit?: (editor: Editor) => void;
    onRemove?: (editor: Editor, element: AttachmentNode) => void;
}
