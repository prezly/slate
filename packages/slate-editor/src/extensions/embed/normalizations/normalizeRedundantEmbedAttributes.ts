import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

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
    editor: SlateEditor,
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
