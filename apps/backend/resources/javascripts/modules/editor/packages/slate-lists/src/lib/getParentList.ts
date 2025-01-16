import type { SlateEditor } from '@udecode/plate-common';
import type { Element, NodeEntry, Path } from 'slate';

import type { ListsSchema } from '../types';

/**
 * Returns parent "list" node of "list-item" at a given path.
 * Returns null if there is no parent "list".
 */
export function getParentList(
    editor: SlateEditor,
    schema: ListsSchema,
    path: Path,
): NodeEntry<Element> | null {
    const parentList = editor.above({
        at: path,
        match: (node) => schema.isListNode(node),
    });

    return parentList ?? null;
}
