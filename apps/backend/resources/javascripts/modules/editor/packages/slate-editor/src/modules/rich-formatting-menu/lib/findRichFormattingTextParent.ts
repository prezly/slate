import type { NodeEntry, SlateEditor } from '@udecode/plate';

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

    const parent = editor.api.parent(path);
    if (!parent) {
        return null;
    }

    return findRichFormattingTextParent(editor, parent);
}
