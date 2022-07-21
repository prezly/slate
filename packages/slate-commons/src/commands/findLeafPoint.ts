import { Editor, Path, Point } from 'slate';

import type { Edge } from './findLeafPath';
import { findLeafPath } from './findLeafPath';

export function findLeafPoint(editor: Editor, point: Point, edge: Edge = 'highest'): Point | null {
    const path = findLeafPath(editor, point.path, edge);

    if (!path) {
        return null;
    }

    const [, end] = Editor.edges(editor, path);

    if (Path.equals(point.path, path)) {
        if (Point.isAfter(point, end)) {
            return end;
        }

        return point;
    }

    const offset =
        edge === 'highest'
            ? Math.min(point.offset, end.offset)
            : Math.max(point.offset, end.offset);

    return {
        offset,
        path,
    };
}
