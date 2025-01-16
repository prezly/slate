import { type VariableNode, isVariableNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

export function removeFallbackPropertyIfEmpty(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isVariableNode(node)) {
        return false;
    }

    if (node.fallback === '') {
        editor.tf.setNodes<VariableNode>({ fallback: undefined }, { at: path });
        return true;
    }

    return false;
}
