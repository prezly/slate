import { times } from '@technically/lodash';
import { NodeApi, type Path, PathApi } from '@udecode/plate';

import { TablesEditor } from '../TablesEditor';

export function splitRowSpanCells(editor: TablesEditor, path: Path) {
    const node = NodeApi.get(editor, path);

    if (!node || !editor.isTableNode(node)) {
        return false;
    }

    for (const [row, rowPath] of NodeApi.children(editor, path)) {
        if (!editor.isTableRowNode(row)) {
            continue;
        }

        for (const [cell, cellPath] of NodeApi.children(editor, rowPath)) {
            if (editor.isTableCellNode(cell) && cell.rowspan && cell.rowspan > 1) {
                const currentCellRelativePath = PathApi.relative(cellPath, rowPath);
                const padCells = times(cell.rowspan - 1, () =>
                    TablesEditor.createTableCell(editor),
                );

                editor.tf.withoutNormalizing(() => {
                    editor.tf.unsetNodes('rowspan', { at: cellPath });
                    let nextRow = PathApi.next(rowPath);

                    for (const padCell of padCells) {
                        const at = [...nextRow, ...currentCellRelativePath];

                        if (editor.api.hasPath(at)) {
                            editor.tf.insertNodes(padCell, { at });
                        } else {
                            console.error(
                                `Can't find path to insert pad cell when split row spans at:`,
                                at,
                            );
                        }

                        nextRow = PathApi.next(nextRow);
                    }
                });

                return true;
            }
        }
    }

    return false;
}
