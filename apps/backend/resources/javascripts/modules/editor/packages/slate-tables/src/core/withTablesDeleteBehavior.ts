import type { Location } from 'slate';
import { Range, Point } from 'slate';

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
    if (editor.selection && Range.isCollapsed(editor.selection)) {
        const [cell] = editor.nodes({
            match: editor.isTableCellNode,
        });

        if (cell) {
            const [, cellPath] = cell;
            const edge = getEdgePoint(cellPath);

            if (Point.equals(editor.selection.anchor, edge)) {
                return false;
            }
        }
    }

    return true;
}
