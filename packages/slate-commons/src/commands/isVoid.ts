import { Editor, Element } from 'slate';
import type { Node } from 'slate';

/**
 * @param editor
 * @param node
 */
export function isVoid(editor: Editor, node: Node): boolean {
    return Element.isElement(node) && Editor.isVoid(editor, node);
}
