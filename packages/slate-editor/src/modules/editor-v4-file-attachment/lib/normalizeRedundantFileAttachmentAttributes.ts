import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createFileAttachment from './createFileAttachment';
import isFileAttachmentElement from './isFileAttachmentElement';

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

const normalizeRedundantFileAttachmentAttributes = (
    editor: Editor,
    [node, path]: NodeEntry,
): boolean => {
    if (!isFileAttachmentElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantFileAttachmentAttributes;
