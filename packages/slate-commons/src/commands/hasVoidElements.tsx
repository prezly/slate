import type { Node, Editor } from 'slate';
import { Text } from 'slate';

import { isVoid } from './isVoid';

export function hasVoidElements(editor: Editor, node: Node): boolean {
    if (Text.isText(node)) {
        return false;
    }
    if (isVoid(editor, node)) {
        return true;
    }
    return node.children.some((child) => hasVoidElements(editor, child));
}
