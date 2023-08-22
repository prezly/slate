import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, NodeEntry } from 'slate';

import { EmbedNode } from '../EmbedNode';

const SHAPE: Record<keyof EmbedNode, boolean> = {
    type: true,
    uuid: true,
    url: true,
    oembed: true,
    layout: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(SHAPE);

export function normalizeRedundantEmbedAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (EmbedNode.isEmbedNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_ATTRIBUTES,
        );
    }
    return false;
}
