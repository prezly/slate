import type { SlateEditor } from '@udecode/plate-common';
import { Path, Point } from 'slate';

import type { Edge } from './findLeafPath';
import { findLeafPath } from './findLeafPath';

export function findLeafPoint(
    editor: SlateEditor,
    point: Point,
    edge: Edge = 'highest',
): Point | undefined {
    const path = findLeafPath(editor, point.path, edge);

    if (!path) {
        return undefined;
    }

    const [, end] = editor.edges(path);

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

    return { offset, path };
}
