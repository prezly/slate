import { EditorCommands } from '@prezly/slate-commons';
import { type VariableNode, isVariableNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const SHAPE: Record<keyof VariableNode, boolean> = {
    type: true,
    key: true,
    children: true,
    fallback: true,
};
const ALLOWED_ATTRIBUTES = Object.keys(SHAPE);

export function removeUnknownVariableNodeAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isVariableNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
