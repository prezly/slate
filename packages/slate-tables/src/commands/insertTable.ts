import { type Location, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { TableNode } from '../nodes';
import type { TablesEditor } from '../TablesEditor';

export function insertTable(
    editor: TablesEditor,
    location: Location | undefined = editor.selection ?? undefined,
    props?: Parameters<typeof TableNode.createTable>[1],
) {
    if (!location) {
        return false;
    }

    Transforms.insertNodes(editor, TableNode.createTable(editor, props), {
        at: location,
    });

    ReactEditor.focus(editor);

    return true;
}
