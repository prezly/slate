import { type Location, NodeApi } from '@udecode/plate';

import { Traverse } from '../core';
import type { TablesEditor } from '../TablesEditor';

export function isInTable(editor: TablesEditor, location: Location | null = editor.selection) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);
    return NodeApi.isNode(traverse?.matrix.node);
}
