import type { Node, SlateEditor } from '@udecode/plate';
import { TextApi } from '@udecode/plate';

import { isVoid } from './isVoid';

export function isNodeEmpty(editor: SlateEditor, node: Node, trim = false): boolean {
    if (TextApi.isText(node)) {
        return trim ? node.text.trim() === '' : node.text === '';
    }

    if (isVoid(editor, node)) {
        return false;
    }

    return node.children.every((child) => isNodeEmpty(editor, child, trim));
}
