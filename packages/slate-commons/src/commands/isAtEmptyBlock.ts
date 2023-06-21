import { Editor, Element } from 'slate';
import { Range } from 'slate';

import { isNodeEmpty } from './isNodeEmpty';

interface Options {
    trim?: boolean;
}

/**
 * Check if the selection is pointing to an empty non-void block element.
 */
export function isAtEmptyBlock(
    editor: Editor,
    at: Range | null = editor.selection,
    options?: Options,
): boolean {
    if (!at) {
        return false;
    }

    if (Range.isExpanded(at)) {
        return false;
    }

    const entry = Editor.node(editor, at, { depth: 1 });
    if (!entry) {
        return false;
    }

    const [node] = entry;
    return (
        Element.isElement(node) && editor.isBlock(node) && isNodeEmpty(editor, node, options?.trim)
    );
}
