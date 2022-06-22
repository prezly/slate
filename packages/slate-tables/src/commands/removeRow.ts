import type { Location } from 'slate';
import { Transforms } from 'slate';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function removeRow(
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

    if (traverse.matrix.height === 1) {
        return TablesEditor.removeTable(editor);
    }

    const { activeRow } = traverse;

    activeRow.cells.forEach((cell) => {
        if (TableCellNode.getCellRowspan(cell.node) > 1) {
            TableCellNode.update(
                editor,
                { rowspan: TableCellNode.calculateCellRowSpan(cell.node, '-', 1) },
                cell.path,
            );
        }
    });

    Transforms.removeNodes(editor, { at: activeRow.path });

    editor.focusEditor();

    return true;
}
