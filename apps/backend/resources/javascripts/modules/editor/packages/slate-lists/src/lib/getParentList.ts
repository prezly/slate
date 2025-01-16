import { type Path, type Element, type NodeEntry, type SlateEditor } from '@udecode/plate';

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
    const parentList = editor.api.above({
        at: path,
        match: (node) => schema.isListNode(node),
    });

    return parentList ?? null;
}
