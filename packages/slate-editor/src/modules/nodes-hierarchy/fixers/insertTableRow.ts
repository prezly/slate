import { TablesEditor } from '@prezly/slate-tables';
import { Transforms } from 'slate';
import type { NodeEntry } from 'slate';
import type { Editor } from 'slate';

export function insertTableRow(editor: Editor, [node, path]: NodeEntry) {
    if (TablesEditor.isTablesEditor(editor)) {
        Transforms.insertNodes(editor, [TablesEditor.createTableRow(editor, { children: 3 })], {
            at: path,
            match: (n) => n === node,
        });

        return true;
    }

    return false;
}
