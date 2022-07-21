import { Editor } from 'slate';
import type { Range, Point } from 'slate';
import { ReactEditor } from 'slate-react';

export type ContainerEdge = 'top' | 'bottom';

export function isCursorOnEdgeOfContainer(
    editor: ReactEditor,
    container: Point,
    child: Point,
    edge: ContainerEdge,
) {
    const a = getPointRect(editor, container);
    const b = getPointRect(editor, child);

    switch (edge) {
        case 'top':
            return a.at(0)?.top === b.at(0)?.top;
        case 'bottom':
            return a.at(-1)?.bottom === b.at(-1)?.bottom;
    }
}

function getPointRect(editor: ReactEditor, point: Point) {
    const range = Editor.range(editor, { ...point, offset: Math.max(point.offset, 0) });
    return getRangeRect(editor, range);
}

function getRangeRect(editor: ReactEditor, range: Range) {
    const domRange = ReactEditor.toDOMRange(editor, range);
    const rects = domRange.getClientRects();

    // if the cursor will be in the beginning of next line there will be two rects:
    // first the ending of previous line and the second one is the beginning of current line
    if (rects.length) {
        return Array.from(rects);
    }

    return [domRange.getBoundingClientRect()];
}
