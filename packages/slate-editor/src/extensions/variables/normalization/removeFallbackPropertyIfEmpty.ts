import { type VariableNode, isVariableNode } from '@prezly/slate-types';
import { Transforms, type Editor, type NodeEntry } from 'slate';

export function removeFallbackPropertyIfEmpty(editor: Editor, [node, path]: NodeEntry): boolean {
    if (!isVariableNode(node)) {
        return false;
    }

    if (node.fallback === '') {
        Transforms.setNodes<VariableNode>(editor, { fallback: undefined }, { at: path });
        return true;
    }

    return false;
}
