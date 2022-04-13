import type { ElementNode } from '@prezly/slate-types';
import type { NodeEntry, Path } from 'slate';
import { Editor } from 'slate';

import type { ListsEditor } from '../types';

/**
 * Returns parent "list" node of "list-item" at a given path.
 * Returns null if there is no parent "list".
 */
export function getParentList(editor: ListsEditor, path: Path): NodeEntry<ElementNode> | null {
    const parentList = Editor.above<ElementNode>(editor, {
        at: path,
        match: (node) => editor.isListNode(node),
    });

    return parentList ?? null;
}
