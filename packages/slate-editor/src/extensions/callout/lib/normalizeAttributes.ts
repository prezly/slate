import { EditorCommands } from '@prezly/slate-commons';
import { CalloutNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';
import { Transforms } from 'slate';

const shape: Record<keyof CalloutNode, true> = {
    type: true,
    align: true,
    icon: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (CalloutNode.isCalloutNode(node)) {
        return (
            EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES) ||
            normalizeIconAttribute(editor, [node, path])
        );
    }

    return false;
}

function normalizeIconAttribute(editor: Editor, [node, path]: NodeEntry<CalloutNode>): boolean {
    // If there's no icon, the attribute should be absent.
    // We replace `null` and "" empty string values with `undefined`.
    if (!node.icon && typeof node.icon !== 'undefined') {
        Transforms.unsetNodes<CalloutNode>(editor, 'icon', {
            match: CalloutNode.isCalloutNode,
            at: path,
        });
        return true;
    }

    return false;
}
