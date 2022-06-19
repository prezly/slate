import type { Location } from 'slate';
import { Node } from 'slate';

import { Traverse } from '../core';
import type { TableEditor } from '../TableEditor';

export function isInTable(editor: TableEditor, location: Location | null = editor.selection) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);
    return Node.isNode(traverse?.matrix.node);
}
