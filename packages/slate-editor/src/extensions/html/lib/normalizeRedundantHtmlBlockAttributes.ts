import { EditorCommands } from '@prezly/slate-commons';
import { isHtmlNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import { createHtmlBlock } from './createHtmlBlock';

const ALLOWED_ATTRIBUTES = Object.keys(createHtmlBlock({ content: '' }));

export function normalizeRedundantHtmlBlockAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isHtmlNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
