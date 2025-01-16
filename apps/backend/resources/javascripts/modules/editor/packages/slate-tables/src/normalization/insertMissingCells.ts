import { times } from '@technically/lodash';
import { NodeApi, type Path, PathApi } from '@udecode/plate';

import type { TableRowNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function insertMissingCells(editor: TablesEditor, path: Path) {
    const table = NodeApi.get(editor, path);

    if (!table || !editor.isTableNode(table)) {
        return false;
    }

    const maxWidth = Math.max(
        ...table.children.map((node) =>
            editor.isTableRowNode(node) ? calculateRowWidth(node) : 0,
        ),
    );

    for (const [row, rowPath] of NodeApi.children(editor, path)) {
        if (editor.isTableRowNode(row)) {
            const rowSize = calculateRowWidth(row);
            const absentCellsQuantity = maxWidth - rowSize;

            if (absentCellsQuantity > 0) {
                const newCells = times(absentCellsQuantity, () =>
                    TablesEditor.createTableCell(editor),
                );

                const lastNodeInRowEntry = Array.from(NodeApi.children(editor, rowPath)).at(-1);

                if (lastNodeInRowEntry) {
                    const [lastNode, lastNodePath] = lastNodeInRowEntry;

                    if (editor.isTableCellNode(lastNode)) {
                        editor.tf.insertNodes(newCells, {
                            at: PathApi.next(lastNodePath),
                        });
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function calculateRowWidth(row: TableRowNode) {
    return row.children.reduce((size, cell) => size + (cell.colspan ?? 1), 0);
}
