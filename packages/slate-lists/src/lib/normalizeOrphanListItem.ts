import type { Node, NodeEntry } from 'slate';
import { Editor, Transforms } from 'slate';

import type { ListsEditor } from '../types';

import { getParentList } from './getParentList';

/**
 * If "list-item" somehow (e.g. by deleting everything around it) ends up
 * at the root of the editor, we have to convert it into a "default-block".
 * ----
 * Alternatively we could wrap it in a "list", but it's unlikely that it's
 * the expected behavior. The only case where it would be expected is during
 * pasting, so we have a separate rule for that in `deserializeHtml`.
 */
export function normalizeOrphanListItem(
    editor: ListsEditor,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!editor.isListItemNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const parentList = getParentList(editor, path);

    if (parentList) {
        // If there is a parent "list", then the fix does not apply.
        return false;
    }

    Editor.withoutNormalizing(editor, () => {
        Transforms.unwrapNodes(editor, { at: path });
        Transforms.setNodes(editor, editor.createDefaultTextNode(), { at: path });
    });

    return true;
}
