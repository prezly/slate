import { EditorCommands } from '@prezly/slate-commons';
import { isEmbedNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import createEmbed from './createEmbed';

const ALLOWED_ATTRIBUTES = Object.keys(createEmbed({ type: 'link', url: '', version: '1.0' }, ''));

function normalizeRedundantEmbedAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (!isEmbedNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}

export default normalizeRedundantEmbedAttributes;
