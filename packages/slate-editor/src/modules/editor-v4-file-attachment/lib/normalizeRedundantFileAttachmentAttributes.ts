import { EditorCommands } from '@prezly/slate-commons';
import { isAttachmentNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import { createFileAttachment } from './createFileAttachment';

const ALLOWED_ATTRIBUTES = Object.keys(
    createFileAttachment(
        {
            filename: '',
            mime_type: '',
            size: 0,
            uuid: '',
            version: 0,
        },
        '',
    ),
);

export function normalizeRedundantFileAttachmentAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isAttachmentNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
