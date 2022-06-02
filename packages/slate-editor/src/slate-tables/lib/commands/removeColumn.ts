import type { Editor, Location } from 'slate';
import { Transforms } from 'slate';

import { TableEditor, Traverse } from '../core';
import { TableCellNode } from '../nodes';

export function removeColumn(
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

    const { activeColumn } = traverse;

    if (traverse.matrix.width === 1) {
        return TableEditor.removeTable(editor);
    }

    const cellToFocus = traverse.activeCell.cellRight ?? traverse.activeCell.cellLeft;

    activeColumn.uniqCells.forEach((cell) => {
        if (TableCellNode.getCellColspan(cell.node) > 1) {
            TableCellNode.update(
                editor,
                { colspan: TableCellNode.calculateCellColSpan(cell.node, '-', 1) },
                cell.nodePath,
            );
        } else {
            Transforms.removeNodes(editor, { at: cell.nodePath });
        }
    });

    editor.focusEditor(editor);

    if (cellToFocus) {
        Transforms.select(editor, {
            path: cellToFocus.nodePath,
            offset: 0,
        });
    }

    return true;
}
