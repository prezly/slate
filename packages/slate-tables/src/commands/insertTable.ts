import { focusEditor } from '@udecode/slate-react';
import { type Location } from 'slate';

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

    editor.insertNodes(TableNode.createTable(editor, props), {
        at: location,
    });

    focusEditor(editor);

    return true;
}
