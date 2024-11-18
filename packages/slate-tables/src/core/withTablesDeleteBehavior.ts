import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';
import { Range, Point } from 'slate';

import type { TablesEditor } from '../TablesEditor';

export function withTablesDeleteBehavior<T extends TablesEditor>(editor: T): T {
    const { deleteBackward, deleteForward } = editor;

    editor.deleteBackward = (unit) => {
        // @ts-expect-error TODO: Fix this
        if (canDeleteInTableCell(editor, editor.start)) {
            deleteBackward(unit);
        }
    };

    editor.deleteForward = (unit) => {
        // @ts-expect-error TODO: Fix this
        if (canDeleteInTableCell(editor, editor.end)) {
            deleteForward(unit);
        }
    };

    return editor;
}

function canDeleteInTableCell<T extends TablesEditor>(
    editor: T,
    getEdgePoint: (editor: SlateEditor, at: Location) => Point,
) {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
        const [cell] = editor.nodes({
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
