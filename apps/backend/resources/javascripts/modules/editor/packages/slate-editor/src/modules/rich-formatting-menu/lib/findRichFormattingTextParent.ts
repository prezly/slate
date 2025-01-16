import type { SlateEditor } from '@udecode/plate-common';
import { type NodeEntry } from 'slate';

import { type RichFormattedTextElement, isRichFormattedTextElement } from '../types';

export function findRichFormattingTextParent(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): RichFormattedTextElement | null {
    if (path.length === 0) {
        return null;
    }

    if (isRichFormattedTextElement(node)) {
        return node;
    }

    return findRichFormattingTextParent(editor, editor.parent(path));
}
