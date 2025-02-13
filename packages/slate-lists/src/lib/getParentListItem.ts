import type { SlateEditor } from '@udecode/plate-common';
import type { Element, NodeEntry, Path } from 'slate';

import type { ListsSchema } from '../types';

/**
 * Returns parent "list-item" node of "list-item" at a given path.
 * Returns null if there is no parent "list-item".
 */
export function getParentListItem(
    editor: SlateEditor,
    schema: ListsSchema,
    path: Path,
): NodeEntry<Element> | null {
    const parentListItem = editor.above({
        at: path,
        match: (node) => schema.isListItemNode(node),
    });

    return parentListItem ?? null;
}
