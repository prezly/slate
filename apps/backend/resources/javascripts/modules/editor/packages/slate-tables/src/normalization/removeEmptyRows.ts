import { Node } from 'slate';
import type { Path } from 'slate';

import type { TablesEditor } from '../TablesEditor';

export function removeEmptyRows(editor: TablesEditor, path: Path) {
    const table = Node.get(editor, path);

    if (!editor.isTableNode(table)) {
        return false;
    }

    for (const [row, rowPath] of Node.children(editor, path)) {
        if (editor.isTableRowNode(row) && row.children.length == 0) {
            editor.removeNodes({ at: rowPath, match: (n) => n === row });
            return true;
        }
    }

    return false;
}
