import { times } from '@technically/lodash';
import { Path } from 'slate';
import { Node, Transforms } from 'slate';
import { Editor } from 'slate';

import type { TableCellNode } from '../nodes';
import { TablesEditor } from '../TablesEditor';

export function splitRowSpanCells(editor: TablesEditor, path: Path) {
    const node = Node.get(editor, path);

    if (!editor.isTableNode(node)) {
        return false;
    }

    for (const [row, rowPath] of Node.children(editor, path)) {
        if (!editor.isTableRowNode(row)) {
            continue;
        }

        for (const [cell, cellPath] of Node.children(editor, rowPath)) {
            if (editor.isTableCellNode(cell) && cell.rowspan && cell.rowspan > 1) {
                const currentCellRelativePath = Path.relative(cellPath, rowPath);
                const padCells = times(cell.rowspan - 1, () =>
                    TablesEditor.createTableCell(editor),
                );

                Editor.withoutNormalizing(editor, () => {
                    Transforms.unsetNodes<TableCellNode>(editor, 'rowspan', { at: cellPath });
                    let nextRow = Path.next(rowPath);

                    for (const padCell of padCells) {
                        const at = [...nextRow, ...currentCellRelativePath];

                        if (Editor.hasPath(editor, at)) {
                            Transforms.insertNodes(editor, padCell, { at });
                        } else {
                            console.error(
                                `Can't find path to insert pad cell when split row spans at:`,
                                at,
                            );
                        }

                        nextRow = Path.next(nextRow);
                    }
                });

                return true;
            }
        }
    }

    return false;
}
