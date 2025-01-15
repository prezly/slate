import { ElementApi, type Range, RangeApi, type SlateEditor } from '@udecode/plate';

import { isNodeEmpty } from './isNodeEmpty';

interface Options {
    trim?: boolean;
}

/**
 * Check if the selection is pointing to an empty non-void block element.
 */
export function isAtEmptyBlock(
    editor: SlateEditor,
    at: Range | null = editor.selection,
    options?: Options,
): boolean {
    if (!at) {
        return false;
    }

    if (RangeApi.isExpanded(at)) {
        return false;
    }

    const entry = editor.api.node(at, { depth: 1 });
    if (!entry) {
        return false;
    }

    const [node] = entry;
    return (
        ElementApi.isElement(node) && editor.api.isBlock(node) && isNodeEmpty(editor, node, options?.trim)
    );
}
