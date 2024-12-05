import { focusEditor } from '@udecode/plate-common/react';
import { type Location, Path } from 'slate';

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

    // As we insert cells one by one Slate calls normalization which insert empty cells
    editor.withoutNormalizing(() => {
        activeColumn.cells.forEach((columnCell, index) => {
            const at = side === 'left' ? columnCell.path : Path.next(columnCell.path);

            if (index === 0) {
                firstCellInNewColumnPath = at;
            }

            editor.insertNodes(TableCellNode.createTableCell(editor), { at });
        });
    });

    editor.normalize();

    focusEditor(editor);

    if (firstCellInNewColumnPath) {
        editor.select(firstCellInNewColumnPath);
    }

    return true;
}
