import { Editor, Element } from 'slate';
import type { Node } from 'slate';

/**
 * @param editor
 * @param node
 */
export function isInline(editor: Editor, node: Node): boolean {
    return Element.isElement(node) && Editor.isInline(editor, node);
}
