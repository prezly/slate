import { type Location, type Path, PathApi } from '@udecode/plate';

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
    editor.tf.withoutNormalizing(() => {
        activeColumn.cells.forEach((columnCell, index) => {
            const at = side === 'left' ? columnCell.path : PathApi.next(columnCell.path);

            if (index === 0) {
                firstCellInNewColumnPath = at;
            }

            editor.tf.insertNodes(TableCellNode.createTableCell(editor), { at });
        });
    });

    editor.tf.normalize();
    editor.tf.focus();

    if (firstCellInNewColumnPath) {
        editor.tf.select(firstCellInNewColumnPath);
    }

    return true;
}
