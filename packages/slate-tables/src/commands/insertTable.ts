import type { Location } from 'slate';
import { Transforms } from 'slate';

import { TableNode } from '../nodes';
import type { TablesEditor } from '../TablesEditor';

export function insertTable(
    editor: TablesEditor,
    location: Location | undefined = editor.selection ?? undefined,
    rowsCount?: number,
    columnsCount?: number,
) {
    if (!location) {
        return false;
    }

    Transforms.insertNodes(editor, TableNode.createTableNode(editor, rowsCount, columnsCount), {
        at: location,
    });

    editor.focusEditor();

    return true;
}
