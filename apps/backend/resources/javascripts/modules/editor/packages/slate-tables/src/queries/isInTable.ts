import type { Location } from 'slate';
import { Node } from 'slate';

import { Traverse } from '../core';
import type { TablesEditor } from '../TablesEditor';

export function isInTable(editor: TablesEditor, location: Location | null = editor.selection) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);
    return Node.isNode(traverse?.matrix.node);
}
