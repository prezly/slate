import type { Node } from 'slate';
import { Editor, Element } from 'slate';

import type { ListsEditor } from '../types';

/**
 * Returns true if given "list-item" node contains a non-empty "list-item-text" node.
 */
export function listItemContainsText(editor: ListsEditor, node: Node): boolean {
    if (Element.isElement(node) && editor.isListItemNode(node)) {
        const [listItemText] = node.children;

        if (Element.isElement(listItemText) && editor.isListItemTextNode(listItemText)) {
            return !Editor.isEmpty(editor, listItemText);
        }
    }
    return false;
}
