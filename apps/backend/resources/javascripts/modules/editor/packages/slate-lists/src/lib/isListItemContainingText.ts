import type { SlateEditor } from '@udecode/plate-common';
import type { Node } from 'slate';
import { Element } from 'slate';

import type { ListsSchema } from '../types';

/**
 * Returns true if given "list-item" node contains a non-empty "list-item-text" node.
 */
export function isListItemContainingText(
    editor: SlateEditor,
    schema: ListsSchema,
    node: Node,
): boolean {
    if (Element.isElement(node) && schema.isListItemNode(node)) {
        return node.children.some((node) => {
            return (
                Element.isElement(node) && schema.isListItemTextNode(node) && !editor.isEmpty(node)
            );
        });
    }
    return false;
}
