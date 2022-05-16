import type { Node, Editor } from 'slate';
import { Text } from 'slate';

import { isVoid } from './isVoid';

export function isNodeEmpty(editor: Editor, node: Node): boolean {
    if (Text.isText(node)) {
        return node.text.length === 0;
    }

    if (isVoid(editor, node)) {
        return false;
    }

    return node.children.every((child) => isNodeEmpty(editor, child));
}
