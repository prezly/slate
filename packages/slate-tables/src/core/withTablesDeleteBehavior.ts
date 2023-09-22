import type { Location, TextUnit } from 'slate';
import { Editor, Range, Point } from 'slate';

import type { TablesEditor } from '../TablesEditor';

export function deleteBackward(
    editor: TablesEditor,
    unit: TextUnit,
    next: Editor['deleteBackward'],
) {
    if (canDeleteInTableCell(editor, Editor.start)) {
        next(unit);
    }
}

export function deleteForward(editor: TablesEditor, unit: TextUnit, next: Editor['deleteForward']) {
    if (canDeleteInTableCell(editor, Editor.end)) {
        next(unit);
    }
}

export function withTablesDeleteBehavior<T extends TablesEditor>(editor: T): T {
    const parent = {
        deleteBackward: editor.deleteBackward,
        deleteForward: editor.deleteForward,
    };

    editor.deleteBackward = (unit) => {
        deleteBackward(editor, unit, parent.deleteBackward);
    };

    editor.deleteForward = (unit) => {
        deleteForward(editor, unit, parent.deleteForward);
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
