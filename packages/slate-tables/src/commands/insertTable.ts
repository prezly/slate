import type { Location } from 'slate';
import { Transforms } from 'slate';

import { TableNode } from '../nodes';
import type { TableEditor } from '../TableEditor';

export function insertTable(
    editor: TableEditor,
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
