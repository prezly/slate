import { type VariableNode, isVariableNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import { type NodeEntry } from 'slate';

export function removeFallbackPropertyIfEmpty(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!isVariableNode(node)) {
        return false;
    }

    if (node.fallback === '') {
        editor.setNodes<VariableNode>({ fallback: undefined }, { at: path });
        return true;
    }

    return false;
}
