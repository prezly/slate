import { times } from 'lodash-es';
import { Path } from 'slate';
import { Node, Transforms } from 'slate';
import { Editor } from 'slate';

import type { TableCellNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function splitColSpanCells(editor: TablesEditor, path: Path) {
    const node = Node.get(editor, path);

    if (!editor.isTableRowNode(node)) {
        return false;
    }

    for (const [cell, cellPath] of Node.children(editor, path)) {
        if (editor.isTableCellNode(cell) && cell.colspan && cell.colspan > 1) {
            const padCells = times(cell.colspan - 1, () => TablesEditor.createTableCell(editor));

            Editor.withoutNormalizing(editor, () => {
                Transforms.unsetNodes<TableCellNode>(editor, 'colspan', { at: cellPath });
                Transforms.insertNodes(editor, padCells, { at: Path.next(cellPath) });
            });

            return true;
        }
    }

    return false;
}
