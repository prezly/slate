import type { SlateEditor } from '@udecode/plate';

import { isNodeEmpty } from './isNodeEmpty';

export function isEmpty(editor: SlateEditor): boolean {
    if (editor.children.length === 0) {
        return true;
    }

    if (editor.children.length === 1) {
        return isNodeEmpty(editor, editor.children[0]);
    }

    return false;
}
