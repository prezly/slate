import { type Location, type Point, PointApi, RangeApi } from '@udecode/plate';

import type { TablesEditor } from '../TablesEditor';

export function withTablesDeleteBehavior<T extends TablesEditor>(editor: T): T {
    const { deleteBackward, deleteForward } = editor;

    editor.deleteBackward = (unit) => {
        if (canDeleteInTableCell(editor, editor.start)) {
            deleteBackward(unit);
        }
    };

    editor.deleteForward = (unit) => {
        if (canDeleteInTableCell(editor, editor.end)) {
            deleteForward(unit);
        }
    };

    return editor;
}

function canDeleteInTableCell<T extends TablesEditor>(
    editor: T,
    getEdgePoint: (at: Location) => Point,
) {
    if (editor.selection && RangeApi.isCollapsed(editor.selection)) {
        const [cell] = editor.api.nodes({
            match: editor.isTableCellNode,
        });

        if (cell) {
            const [, cellPath] = cell;
            const edge = getEdgePoint(cellPath);

            if (PointApi.equals(editor.selection.anchor, edge)) {
                return false;
            }
        }
    }

    return true;
}
