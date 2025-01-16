import { times } from '@technically/lodash';
import { Node } from 'slate';
import { Path } from 'slate';

import type { TableRowNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function insertMissingCells(editor: TablesEditor, path: Path) {
    const table = Node.get(editor, path);

    if (!editor.isTableNode(table)) {
        return false;
    }

    const maxWidth = Math.max(
        ...table.children.map((node) =>
            editor.isTableRowNode(node) ? calculateRowWidth(node) : 0,
        ),
    );

    for (const [row, rowPath] of Node.children(editor, path)) {
        if (editor.isTableRowNode(row)) {
            const rowSize = calculateRowWidth(row);
            const absentCellsQuantity = maxWidth - rowSize;

            if (absentCellsQuantity > 0) {
                const newCells = times(absentCellsQuantity, () =>
                    TablesEditor.createTableCell(editor),
                );

                const lastNodeInRowEntry = Array.from(Node.children(editor, rowPath)).at(-1);

                if (lastNodeInRowEntry) {
                    const [lastNode, lastNodePath] = lastNodeInRowEntry;

                    if (editor.isTableCellNode(lastNode)) {
                        editor.insertNodes(newCells, {
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

function calculateRowWidth(row: TableRowNode) {
    return row.children.reduce((size, cell) => size + (cell.colspan ?? 1), 0);
}
