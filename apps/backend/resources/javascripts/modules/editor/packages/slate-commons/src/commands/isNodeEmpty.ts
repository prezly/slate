import type { SlateEditor } from '@udecode/plate-common';
import type { Node } from 'slate';
import { Text } from 'slate';

import { isVoid } from './isVoid';

export function isNodeEmpty(editor: SlateEditor, node: Node, trim = false): boolean {
    if (Text.isText(node)) {
        return trim ? node.text.trim() === '' : node.text === '';
    }

    if (isVoid(editor, node)) {
        return false;
    }

    return node.children.every((child) => isNodeEmpty(editor, child, trim));
}
