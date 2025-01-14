import type { SlateEditor } from '@udecode/plate-common';
import type { Node } from 'slate';
import { Text } from 'slate';

import { isVoid } from './isVoid';

export function hasVoidElements(editor: SlateEditor, node: Node): boolean {
    if (Text.isText(node)) {
        return false;
    }
    if (isVoid(editor, node)) {
        return true;
    }
    return node.children.some((child) => hasVoidElements(editor, child));
}
