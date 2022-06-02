import type { Editor, Location } from 'slate';
import { Path, Transforms } from 'slate';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import type { HorizontalSides } from '../utils/types';

export function insertColumn(
    editor: Editor,
    location: Location | undefined = editor.selection ?? undefined,
    side: HorizontalSides,
) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);

    if (!traverse) {
        return false;
    }

    const { activeColumn } = traverse;
    const anchorColumn = side === 'left' ? activeColumn : activeColumn.columnRight ?? activeColumn;

    anchorColumn.cells.forEach((columnCell) => {
        const at =
            side === 'left'
                ? columnCell.virtualPathWithRow
                : activeColumn === anchorColumn
                ? Path.next(columnCell.virtualPathWithRow)
                : columnCell.virtualPathWithRow;

        Transforms.insertNodes(editor, TableCellNode.createTableCellNode(editor), { at });
    });

    editor.focusEditor(editor);

    return true;
}
