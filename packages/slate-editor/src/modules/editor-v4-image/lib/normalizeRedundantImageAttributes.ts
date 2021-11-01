import { EditorCommands } from '@prezly/slate-commons';
import { ImageNode, isImageNode } from '@prezly/slate-types';
import { Editor, NodeEntry } from 'slate';

type Keys<T> = {
    [P in keyof T]: true;
};

const shape: Keys<ImageNode> = {
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
