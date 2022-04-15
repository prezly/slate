import type { Node, NodeEntry } from 'slate';
import { Transforms } from 'slate';

import { getParentListItem } from '../lib';
import type { ListsEditor } from '../types';

/**
 * If "list-item-text" somehow (e.g. by deleting everything around it) ends up
 * at the root of the editor, we have to convert it into a "default-block".
 * ----
 * Alternatively we could wrap it in a "list-item", but it's unlikely that it's
 * the expected behavior. The only case where it would be expected is during
 * pasting, so we have a separate rule for that in `deserializeHtml`.
 */
export function normalizeOrphanListItemText(
    editor: ListsEditor,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!editor.isListItemTextNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const parentListItem = getParentListItem(editor, path);

    if (parentListItem) {
        // If there is a parent "list-item", then the fix does not apply.
        return false;
    }

    Transforms.setNodes(editor, editor.createDefaultTextNode(), { at: path });

    return true;
}
