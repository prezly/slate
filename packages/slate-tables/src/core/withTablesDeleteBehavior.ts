import type { Location } from 'slate';
import { Editor, Range, Point } from 'slate';

import type { TablesEditor } from '../TablesEditor';

export function withTablesDeleteBehavior<T extends TablesEditor>(editor: T): T {
    const { deleteBackward, deleteForward } = editor;

    editor.deleteBackward = (unit) => {
        if (canDeleteInTableCell(editor, Editor.start)) {
            deleteBackward(unit);
        }
    };

    editor.deleteForward = (unit) => {
        if (canDeleteInTableCell(editor, Editor.end)) {
            deleteForward(unit);
        }
    };

    return editor;
}

function canDeleteInTableCell<T extends TablesEditor>(
    editor: T,
    getEdgePoint: (editor: Editor, at: Location) => Point,
) {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
        const [cell] = Editor.nodes(editor, {
            match: editor.isTableCellNode,
        });

        if (cell) {
            const [, cellPath] = cell;
            const edge = getEdgePoint(editor, cellPath);

            if (Point.equals(editor.selection.anchor, edge)) {
                return false;
            }
        }
    }

    return true;
}
