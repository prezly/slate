import type { Node, Editor } from 'slate';
import { Text } from 'slate';

import { isVoid } from './isVoid';

export function isNodeEmpty(editor: Editor, node: Node, trim = false): boolean {
    if (Text.isText(node)) {
        return trim ? node.text.trim() === '' : node.text === '';
    }

    if (isVoid(editor, node)) {
        return false;
    }

    return node.children.every((child) => isNodeEmpty(editor, child, trim));
}
