import type { Editor, Location } from 'slate';
import { Transforms } from 'slate';

import { TableEditor, Traverse } from '../core';
import { TableCellNode } from '../nodes';

export function removeRow(
    editor: Editor,
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
        return TableEditor.removeTable(editor, traverse.matrix.node);
    }

    const { activeRow } = traverse;
    const cellToFocus = traverse.activeCell.cellBelow ?? traverse.activeCell.cellAbove;

    activeRow.uniqCells.forEach((cell) => {
        if (TableCellNode.getCellRowspan(cell.node) > 1) {
            TableCellNode.update(
                editor,
                { rowSpan: TableCellNode.calculateCellRowSpan(cell.node, '-', 1) },
                cell.nodePath,
            );
        }
    });

    Transforms.removeNodes(editor, { at: activeRow.path });

    editor.focusEditor(editor);

    if (cellToFocus) {
        Transforms.select(editor, {
            path: cellToFocus.nodePath,
            offset: 0,
        });
    }

    return true;
}
