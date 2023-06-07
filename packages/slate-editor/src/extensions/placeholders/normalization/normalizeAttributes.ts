import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, NodeEntry } from 'slate';

import { PlaceholderNode } from '../PlaceholderNode';

const SHAPE = {
    uuid: true,
    type: true,
    children: true,
} satisfies Record<keyof PlaceholderNode, boolean>;

const ALLOWED_ATTRIBUTES = Object.keys(SHAPE);

export function normalizeAttributes(editor: Editor, [node, path]: NodeEntry) {
    if (PlaceholderNode.isPlaceholderNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_ATTRIBUTES,
        );
    }
    return false;
}
