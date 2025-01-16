import { ElementApi, type SlateEditor } from '@udecode/plate';

import type { ListsSchema } from '../types';

/**
 * Returns true if given "list-item" node contains a non-empty "list-item-text" node.
 */
export function isListItemContainingText(
    editor: SlateEditor,
    schema: ListsSchema,
    node: Node,
): boolean {
    if (ElementApi.isElement(node) && schema.isListItemNode(node)) {
        return node.children.some((node) => {
            return (
                ElementApi.isElement(node) &&
                schema.isListItemTextNode(node) &&
                !editor.api.isEmpty(node)
            );
        });
    }
    return false;
}
