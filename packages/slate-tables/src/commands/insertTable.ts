import { type Location, Transforms } from 'slate';
import { ReactEditor } from "slate-react";

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

    ReactEditor.focus(editor);

    return true;
}
