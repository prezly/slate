import type { TNode } from '@udecode/plate-common';
import { isElement, type SlateEditor } from '@udecode/plate-common';
import type { Node } from 'slate';

export function isBlock(editor: SlateEditor, node: Node | TNode): boolean {
    return isElement(node) && editor.isBlock(node);
}
