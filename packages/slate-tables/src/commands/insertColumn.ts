import { type Location, Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import type { TablesEditor } from '../TablesEditor';
import type { HorizontalSides } from '../utils/types';

export function insertColumn(
    editor: TablesEditor,
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
    let firstCellInNewColumnPath: Path | undefined = undefined;

    activeColumn.cells.forEach((columnCell, index) => {
        const at = side === 'left' ? columnCell.path : Path.next(columnCell.path);

        if (index === 0) {
            firstCellInNewColumnPath = at;
        }

        Transforms.insertNodes(editor, TableCellNode.createTableCell(editor), { at });
    });

    ReactEditor.focus(editor);

    return true;
}
