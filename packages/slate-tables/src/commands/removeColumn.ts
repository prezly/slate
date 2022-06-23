import { type Location, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { Traverse } from '../core';
import { TableCellNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function removeColumn(
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

    const { activeColumn } = traverse;

    if (traverse.matrix.width === 1) {
        return TablesEditor.removeTable(editor);
    }

    activeColumn.cells.forEach((cell) => {
        if (TableCellNode.getCellColspan(cell.node) > 1) {
            TableCellNode.update(
                editor,
                { colspan: TableCellNode.calculateCellColSpan(cell.node, '-', 1) },
                cell.path,
            );
        } else {
            Transforms.removeNodes(editor, { at: cell.path });
        }
    });

    ReactEditor.focus(editor);

    return true;
}
