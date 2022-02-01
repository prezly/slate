import type { Editor } from 'slate';
import { Range } from 'slate';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';
import { isEmptyParagraphElement } from './isEmptyParagraphElement';

interface Options {
    shouldTrim?: boolean;
}

export function isCursorInEmptyParagraph(editor: Editor, options?: Options): boolean {
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
    return isEmptyParagraphElement(editor, currentNode, options);
}
