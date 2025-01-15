import { TextApi, type Node, type SlateEditor } from '@udecode/plate';

import { isVoid } from './isVoid';

export function hasVoidElements(editor: SlateEditor, node: Node): boolean {
    if (TextApi.isText(node)) {
        return false;
    }
    if (isVoid(editor, node)) {
        return true;
    }
    return node.children.some((child) => hasVoidElements(editor, child));
}
