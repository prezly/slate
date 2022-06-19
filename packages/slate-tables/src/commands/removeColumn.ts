import type { Location } from 'slate';
import { Transforms } from 'slate';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import { TableEditor } from '../TableEditor';

export function removeColumn(
    editor: TableEditor,
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

    editor.focusEditor();

    return true;
}
