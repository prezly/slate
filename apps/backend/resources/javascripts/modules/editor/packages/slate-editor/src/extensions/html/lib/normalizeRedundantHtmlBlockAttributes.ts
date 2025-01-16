import { EditorCommands } from '@prezly/slate-commons';
import { isHtmlNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { createHtmlBlock } from './createHtmlBlock';

const ALLOWED_ATTRIBUTES = Object.keys(createHtmlBlock({ content: '' }));

export function normalizeRedundantHtmlBlockAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isHtmlNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
