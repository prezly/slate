import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import type { TableNode } from '../nodes';

export function removeTable(editor: Editor, table: TableNode) {
    return EditorCommands.removeNode<TableNode>(editor, {
        at: [],
        match: (node) => node === table,
    });
}
