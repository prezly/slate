import type { Node } from 'slate';
import { Editor, Element } from 'slate';

import type { ListsEditor } from '../types';

/**
 * Returns true if given "list-item" node contains a non-empty "list-item-text" node.
 */
export function isListItemContainingText(editor: ListsEditor, node: Node): boolean {
    if (Element.isElement(node) && editor.isListItemNode(node)) {
        return node.children.some((node) => {
            return (
                Element.isElement(node) &&
                editor.isListItemTextNode(node) &&
                !Editor.isEmpty(editor, node)
            );
        });
    }
    return false;
}
