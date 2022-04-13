import type { Element, NodeEntry, Path } from 'slate';
import { Editor } from 'slate';

import type { ListsEditor } from '../types';

/**
 * Returns parent "list" node of "list-item" at a given path.
 * Returns null if there is no parent "list".
 */
export function getParentList(editor: ListsEditor, path: Path): NodeEntry<Element> | null {
    const parentList = Editor.above(editor, {
        at: path,
        match: (node): node is Element => editor.isListNode(node),
    });

    return parentList ?? null;
}
