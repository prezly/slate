import { RangeApi, type SlateEditor } from '@udecode/plate';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';
import { isEmptyParagraphElement } from './isEmptyParagraphElement';

interface Options {
    trim?: boolean;
}

export function isCursorInEmptyParagraph(editor: SlateEditor, options?: Options): boolean {
    if (!editor.selection) {
        return false;
    }

    if (RangeApi.isExpanded(editor.selection)) {
        return false;
    }

    const currentNodeEntry = getCurrentNodeEntry(editor);

    if (!currentNodeEntry) {
        return false;
    }

    const [currentNode] = currentNodeEntry;
    return isEmptyParagraphElement(editor, currentNode, options?.trim);
}
