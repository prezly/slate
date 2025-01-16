import { EditorCommands } from '@prezly/slate-commons';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { PlaceholderNode } from '../PlaceholderNode';

const SHAPE = {
    uuid: true,
    type: true,
    children: true,
    provider: true,
} satisfies Record<keyof PlaceholderNode, boolean>;

const ALLOWED_ATTRIBUTES = Object.keys(SHAPE);

export function normalizeAttributes(editor: SlateEditor, [node, path]: NodeEntry) {
    if (PlaceholderNode.isPlaceholderNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_ATTRIBUTES,
        );
    }
    return false;
}
