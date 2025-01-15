import { type Location } from '@udecode/plate';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function removeColumn(
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

    const { activeColumn } = traverse;
    const { columnLeft } = activeColumn;

    if (traverse.matrix.width === 1) {
        return TablesEditor.removeTable(editor);
    }

    // As we remove cells one by one Slate calls normalization which insert empty cells
    editor.tf.withoutNormalizing(() => {
        activeColumn.cells.forEach((cell) => {
            if (TableCellNode.getCellColspan(cell.node) > 1) {
                TableCellNode.update(
                    editor,
                    { colspan: TableCellNode.calculateCellColSpan(cell.node, '-', 1) },
                    cell.path,
                );
            } else {
                editor.tf.removeNodes({ at: cell.path });
            }
        });
    });

    editor.tf.normalize();

    let anchorFocusColumn = activeColumn;

    if (activeColumn.isLast && columnLeft) {
        anchorFocusColumn = columnLeft;
    }

    const firstCell = anchorFocusColumn.cells.at(0);

    if (firstCell) {
        editor.tf.select(firstCell.path);
        editor.tf.collapse({ edge: 'start' });
    }

    editor.tf.focus();

    return true;
}
