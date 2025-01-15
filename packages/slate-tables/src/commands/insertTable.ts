import { type Location } from '@udecode/plate';

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

    editor.tf.insertNodes(TableNode.createTable(editor, props), {
        at: location,
    });

    editor.tf.focus();

    return true;
}
