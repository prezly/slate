import type { Editor, Location } from 'slate';
import { Node, Path, Transforms } from 'slate';

import { Traverse } from '../core';
import { TableRowNode, TableCellNode } from '../nodes';
import type { VerticalSides } from '../utils/types';

export function insertRow(
    editor: Editor,
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

    const firstCell = Node.children(editor, at).next();

    editor.focusEditor(editor);

    if (firstCell.value) {
        const [, firstCellPath] = firstCell.value;

        Transforms.select(editor, {
            path: firstCellPath,
            offset: 0,
        });
    }

    return true;
}
