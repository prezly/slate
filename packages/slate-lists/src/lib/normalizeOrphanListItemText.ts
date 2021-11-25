import type { Editor, Element, Node, NodeEntry } from 'slate';
import { Transforms } from 'slate';

import type { ListsOptions } from '../types';

import getParentListItem from './getParentListItem';
import isListItemText from './isListItemText';

/**
 * If "list-item-text" somehow (e.g. by deleting everything around it) ends up
 * at the root of the editor, we have to convert it into a "default-block".
 * ----
 * Alternatively we could wrap it in a "list-item", but it's unlikely that it's
 * the expected behavior. The only case where it would be expected is during
 * pasting, so we have a separate rule for that in `deserializeHtml`.
 */
const normalizeOrphanListItemText = (
    options: ListsOptions,
    editor: Editor,
    [node, path]: NodeEntry<Node>,
): boolean => {
    if (!isListItemText(options, node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const parentListItem = getParentListItem(options, editor, path);

    if (parentListItem) {
        // If there is a parent "list-item", then the fix does not apply.
        return false;
    }

    Transforms.setNodes(
        editor,
        { type: options.defaultBlockType as Element['type'] },
        { at: path },
    );

    return true;
};

export default normalizeOrphanListItemText;
