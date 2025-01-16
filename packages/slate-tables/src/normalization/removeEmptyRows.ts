import { NodeApi, type Path } from '@udecode/plate';

import type { TablesEditor } from '../TablesEditor';

export function removeEmptyRows(editor: TablesEditor, path: Path) {
    const table = NodeApi.get(editor, path);

    if (!table || !editor.isTableNode(table)) {
        return false;
    }

    for (const [row, rowPath] of NodeApi.children(editor, path)) {
        if (editor.isTableRowNode(row) && row.children.length == 0) {
            editor.tf.removeNodes({ at: rowPath, match: (n) => n === row });
            return true;
        }
    }

    return false;
}
