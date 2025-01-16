import { times } from '@technically/lodash';
import { Path } from 'slate';
import { Node } from 'slate';

import { TablesEditor } from '../TablesEditor';

export function splitColSpanCells(editor: TablesEditor, path: Path) {
    const node = Node.get(editor, path);

    if (!editor.isTableRowNode(node)) {
        return false;
    }

    for (const [cell, cellPath] of Node.children(editor, path)) {
        if (editor.isTableCellNode(cell) && cell.colspan && cell.colspan > 1) {
            const padCells = times(cell.colspan - 1, () => TablesEditor.createTableCell(editor));

            editor.withoutNormalizing(() => {
                editor.unsetNodes('colspan', { at: cellPath });
                editor.insertNodes(padCells, { at: Path.next(cellPath) });
            });

            return true;
        }
    }

    return false;
}
