import type { Editor } from 'slate';
import { Range } from 'slate';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';
import type { IsEmptyParagraphElementOptions } from './isEmptyParagraphElement';
import { isEmptyParagraphElement } from './isEmptyParagraphElement';

export interface IsCursorInEmptyParagraphOptions {
    shouldTrim?: IsEmptyParagraphElementOptions['shouldTrim'];
}

export function isCursorInEmptyParagraph(
    editor: Editor,
    options?: IsCursorInEmptyParagraphOptions,
): boolean {
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
