import type { AttachmentNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export interface FileAttachmentExtensionParameters {
    styled: boolean;
}

export interface FileAttachmentParameters extends FileAttachmentExtensionParameters {
    onEdit: (editor: Editor, element: Partial<AttachmentNode>) => void;
    onRemove?: (editor: Editor, element: AttachmentNode) => void;
}
