import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const shape: { [P in keyof ImageNode]: true } = {
    type: true,
    file: true,
    href: true,
    layout: true,
    width: true,
    width_factor: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

const normalizeRedundantImageAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isImageNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantImageAttributes;
