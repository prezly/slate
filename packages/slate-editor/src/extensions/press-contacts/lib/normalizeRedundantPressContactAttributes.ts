import { EditorCommands } from '@prezly/slate-commons';
import type { ContactNode } from '@prezly/slate-types';
import { isContactNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const SHAPE: Record<keyof ContactNode, boolean> = {
    type: true,
    uuid: true,
    contact: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(SHAPE);

export function normalizeRedundantPressContactAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isContactNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
