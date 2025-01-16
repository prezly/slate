import { times } from '@technically/lodash';
import { NodeApi, type Path, PathApi } from '@udecode/plate';

import { TablesEditor } from '../TablesEditor';

export function splitColSpanCells(editor: TablesEditor, path: Path) {
    const node = NodeApi.get(editor, path);

    if (!node || !editor.isTableRowNode(node)) {
        return false;
    }

    for (const [cell, cellPath] of NodeApi.children(editor, path)) {
        if (editor.isTableCellNode(cell) && cell.colspan && cell.colspan > 1) {
            const padCells = times(cell.colspan - 1, () => TablesEditor.createTableCell(editor));

            editor.tf.withoutNormalizing(() => {
                editor.tf.unsetNodes('colspan', { at: cellPath });
                editor.tf.insertNodes(padCells, { at: PathApi.next(cellPath) });
            });

            return true;
        }
    }

    return false;
}
