import type { Node } from 'slate';
import { Editor } from 'slate';

import type { ListsEditor } from '../types';

/**
 * Returns true if given "list-item" node contains a non-empty "list-item-text" node.
 */
export function listItemContainsText(editor: ListsEditor, node: Node): boolean {
    if (!editor.isListItemNode(node)) {
        return false;
    }

    const [listItemText] = node.children;

    if (!editor.isListItemTextNode(listItemText)) {
        return false;
    }

    return !Editor.isEmpty(editor, listItemText);
}
