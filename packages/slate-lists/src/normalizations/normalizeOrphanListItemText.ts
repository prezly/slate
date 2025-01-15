import { ElementApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

import { isContainingTextNodes, isElementOrEditor } from '../lib';
import type { ListsSchema } from '../types';

/**
 * If "list-item-text" somehow (e.g. by deleting everything around it) ends up
 * at the root of the editor, we have to convert it into a "default-block".
 * ----
 * Alternatively we could wrap it in a "list-item", but it's unlikely that it's
 * the expected behavior. The only case where it would be expected is during
 * pasting, so we have a separate rule for that in `deserializeHtml`.
 */
export function normalizeOrphanListItemText(
    editor: SlateEditor,
    schema: ListsSchema,
    [node, path]: NodeEntry,
): boolean {
    if (isElementOrEditor(node) && !schema.isListItemNode(node)) {
        // We look for "list-item-text" nodes that are NOT under a "list-item" node
        for (const [index, child] of node.children.entries()) {
            if (ElementApi.isElement(child) && schema.isListItemTextNode(child)) {
                if (isContainingTextNodes(child)) {
                    editor.tf.setNodes(schema.createDefaultTextNode(), {
                        at: [...path, index],
                    });
                } else {
                    editor.tf.unwrapNodes({
                        at: [...path, index],
                        mode: 'highest',
                    });
                }
                return true;
            }
        }
    }

    return false;
}
