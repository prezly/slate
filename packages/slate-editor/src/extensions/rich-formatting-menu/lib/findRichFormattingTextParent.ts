import { type NodeEntry, Editor } from 'slate';

import { type RichFormattedTextElement, isRichFormattedTextElement } from '../types';

export function findRichFormattingTextParent(
    editor: Editor,
    [node, path]: NodeEntry,
): RichFormattedTextElement | null {
    if (path.length === 0) {
        return null;
    }

    if (isRichFormattedTextElement(node)) {
        return node;
    }

    return findRichFormattingTextParent(editor, Editor.parent(editor, path));
}
