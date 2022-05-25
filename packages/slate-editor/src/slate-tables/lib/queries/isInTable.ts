import type { Editor, Location } from 'slate';
import { Node } from 'slate';

import { Traverse } from '../core';

export function isInTable(editor: Editor, location: Location | null = editor.selection) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);
    return Node.isNode(traverse?.matrix.node);
}
