import { Editor, Element } from 'slate';
import type { Node } from 'slate';

/**
 * @param editor
 * @param node
 */
export function isBlock(editor: Editor, node: Node): boolean {
    return Element.isElement(node) && Editor.isBlock(editor, node);
}
