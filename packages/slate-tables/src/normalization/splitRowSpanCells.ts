import { times } from '@technically/lodash';
import { Path } from 'slate';
import { Node } from 'slate';

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

                editor.withoutNormalizing(() => {
                    editor.unsetNodes('rowspan', { at: cellPath });
                    let nextRow = Path.next(rowPath);

                    for (const padCell of padCells) {
                        const at = [...nextRow, ...currentCellRelativePath];

                        if (editor.hasPath(at)) {
                            editor.insertNodes(padCell, { at });
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
