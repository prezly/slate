import { times } from 'lodash-es';
import { Node, Transforms } from 'slate';
import { Path } from 'slate';

import type { TableRowNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function restoreAbsentCells(editor: TablesEditor, path: Path) {
    const table = Node.get(editor, path);

    if (!editor.isTableNode(table)) {
        return false;
    }

    const maxWidth = table.children.reduce((max, row) => {
        const rowSize = calculateWholeRowSize(row);

        if (rowSize > max) {
            return rowSize;
        }

        return max;
    }, 0);

    for (const [row, rowPath] of Node.children(editor, path)) {
        if (editor.isTableRowNode(row)) {
            const rowSize = calculateWholeRowSize(row);
            const absentCellsQuantity = maxWidth - rowSize;

            if (absentCellsQuantity > 0) {
                const newCells = times(absentCellsQuantity, () =>
                    TablesEditor.createTableCell(editor),
                );

                const lastNodeInRowEntry = Array.from(Node.children(editor, rowPath)).at(-1);

                if (lastNodeInRowEntry) {
                    const [lastNode, lastNodePath] = lastNodeInRowEntry;

                    if (editor.isTableCellNode(lastNode)) {
                        Transforms.insertNodes(editor, newCells as any, {
                            at: Path.next(lastNodePath),
                        });
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function calculateWholeRowSize(row: TableRowNode) {
    return row.children.reduce((size, cell) => size + (cell.colspan ?? 1), 0);
}
