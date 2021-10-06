import { EditorCommands } from '@prezly/slate-commons';
import { isImageNode } from '@prezly/slate-types';
import { Editor, NodeEntry } from 'slate';

import createImage from './createImage';

const ALLOWED_ATTRIBUTES = Object.keys(
    createImage({
        effects: [],
        filename: '',
        mime_type: '',
        original_height: 0,
        original_width: 0,
        size: 0,
        uuid: '',
        version: 0,
    }),
);

const normalizeRedundantImageAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isImageNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantImageAttributes;
