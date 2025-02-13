import { focusEditor } from '@udecode/plate-common/react';
import { type Location } from 'slate';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function removeRow(
    editor: TablesEditor,
    location: Location | undefined = editor.selection ?? undefined,
) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);

    if (!traverse) {
        return false;
    }

    if (traverse.matrix.height === 1) {
        return TablesEditor.removeTable(editor);
    }

    const { activeRow } = traverse;

    activeRow.cells.forEach((cell) => {
        if (TableCellNode.getCellRowspan(cell.node) > 1) {
            TableCellNode.update(
                editor,
                { rowspan: TableCellNode.calculateCellRowSpan(cell.node, '-', 1) },
                cell.path,
            );
        }
    });

    editor.removeNodes({ at: activeRow.path });

    const anchorFocusRow = activeRow.rowBelow ?? activeRow;

    const firstCell = anchorFocusRow.rowAbove.cells.at(0);

    if (firstCell) {
        editor.select(firstCell.path);
        editor.collapse({ edge: 'start' });
    }

    focusEditor(editor);

    return true;
}
