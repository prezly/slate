import type { Location } from 'slate';
import { Path, Transforms } from 'slate';

import { Traverse } from '../core';
import { TableRowNode, TableCellNode } from '../nodes';
import type { TableEditor } from '../TableEditor';
import type { VerticalSides } from '../utils/types';

export function insertRow(
    editor: TableEditor,
    location: Location | undefined = editor.selection ?? undefined,
    side: VerticalSides,
) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);

    if (!traverse) {
        return false;
    }

    const { activeRow } = traverse;
    const anchorRow = side === 'above' ? activeRow : activeRow.rowBelow ?? activeRow;

    const cellsToAdd = anchorRow.cells.reduce((acc, c) => {
        if (c.isVirtual && TableCellNode.getCellRowspan(c.node) > 1) {
            return acc;
        } else {
            return acc + 1;
        }
    }, 0);

    const newRow = TableRowNode.createTableRowNode(editor, {}, cellsToAdd);

    const at =
        anchorRow === activeRow && side === 'bellow' ? Path.next(anchorRow.path) : anchorRow.path;

    Transforms.insertNodes(editor, newRow, { at });

    editor.focusEditor();

    return true;
}