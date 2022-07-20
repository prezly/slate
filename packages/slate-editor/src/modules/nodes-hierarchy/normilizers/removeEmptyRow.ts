import { TablesEditor } from '@prezly/slate-tables';
import { isTableNode, isTableRowNode } from '@prezly/slate-types';
import { Node, Transforms } from 'slate';
import type { Path } from 'slate';
import type { Editor } from 'slate';

export function removeEmptyRow(editor: Editor, path: Path) {
    const table = Node.get(editor, path);

    if (!isTableNode(table) || !TablesEditor.isTablesEditor(editor)) {
        return false;
    }

    for (const [row, rowPath] of Node.children(editor, path)) {
        if (isTableRowNode(row) && row.children.length == 0) {
            Transforms.removeNodes(editor, { at: rowPath, match: (n) => n === row });
            return true;
        }
    }

    return false;
}
