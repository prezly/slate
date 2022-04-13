import type { Element, NodeEntry, Path } from 'slate';
import { Editor } from 'slate';

import type { ListsEditor } from '../types';

/**
 * Returns parent "list-item" node of "list-item" at a given path.
 * Returns null if there is no parent "list-item".
 */
export function getParentListItem(editor: ListsEditor, path: Path): NodeEntry<Element> | null {
    const parentListItem = Editor.above<Element>(editor, {
        at: path,
        match: (node) => editor.isListItemNode(node),
    });

    return parentListItem ?? null;
}
