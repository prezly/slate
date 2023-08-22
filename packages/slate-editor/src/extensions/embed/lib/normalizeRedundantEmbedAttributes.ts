import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, NodeEntry } from 'slate';

import { EmbedNode } from '../EmbedNode';

import { createEmbed } from './createEmbed';

const ALLOWED_ATTRIBUTES = Object.keys(createEmbed({ type: 'link', url: '', version: '1.0' }, ''));

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
