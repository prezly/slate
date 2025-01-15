import { PathApi, type Point, PointApi, type SlateEditor } from '@udecode/plate';

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

    const edges = editor.api.edges(path);
    if (!edges) {
        return undefined;
    }

    const [, end] = edges;
    if (PathApi.equals(point.path, path)) {
        if (PointApi.isAfter(point, end)) {
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
