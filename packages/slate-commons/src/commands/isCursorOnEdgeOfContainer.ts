import type { SlateEditor } from '@udecode/plate-common';
import { toDOMRange } from '@udecode/slate-react';
import type { Range, Point } from 'slate';

export type ContainerEdge = 'top' | 'bottom';

export function isCursorOnFirstLine(editor: SlateEditor, container: Point, cursor: Point): boolean {
    return isCursorOnEdgeOfContainer(editor, container, cursor, 'top');
}

export function isCursorOnLastLine(editor: SlateEditor, container: Point, cursor: Point): boolean {
    return isCursorOnEdgeOfContainer(editor, container, cursor, 'bottom');
}

export function isCursorOnEdgeOfContainer(
    editor: SlateEditor,
    container: Point,
    cursor: Point,
    edge: ContainerEdge,
) {
    const a = getPointRect(editor, container);
    const b = getPointRect(editor, cursor);

    if (!a || !b) {
        return false;
    }

    switch (edge) {
        case 'top':
            return a.at(0)?.top === b.at(0)?.top;
        case 'bottom':
            return a.at(-1)?.bottom === b.at(-1)?.bottom;
    }
}

function getPointRect(editor: SlateEditor, point: Point) {
    const range = editor.range({ ...point, offset: Math.max(point.offset, 0) });
    try {
        return getRangeRect(editor, range);
    } catch {
        return undefined;
    }
}

/**
 * @throws error when `toDOMRange()` cannot match range to a DOM node
 */
function getRangeRect(editor: SlateEditor, range: Range) {
    const domRange = toDOMRange(editor, range);
    if (!domRange) {
        throw new Error('toDOMRange cannot find a DOM node');
    }

    const rects = domRange.getClientRects();

    // if the cursor will be in the beginning of next line there will be two rects:
    // first the ending of previous line and the second one is the beginning of current line
    if (rects.length) {
        return Array.from(rects);
    }

    return [domRange.getBoundingClientRect()];
}
