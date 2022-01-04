import type { Editor } from 'slate';
import { Range } from 'slate';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';
import { isEmptyParagraphElement } from './isEmptyParagraphElement';

export function isCursorInEmptyParagraph(editor: Editor): boolean {
    if (!editor.selection) {
        return false;
    }

    if (Range.isExpanded(editor.selection)) {
        return false;
    }

    const currentNodeEntry = getCurrentNodeEntry(editor);

    if (!currentNodeEntry) {
        return false;
    }

    const [currentNode] = currentNodeEntry;
    return isEmptyParagraphElement(editor, currentNode);
}
