import type { NodeEntry, Path } from 'slate';
import { Node, Element } from 'slate';

import { NESTED_LIST_PATH_INDEX } from '../constants';
import type { ListsEditor } from '../types';

/**
 * Returns "list" node nested in "list-item" at a given path.
 * Returns null if there is no nested "list".
 */
export function getNestedList(editor: ListsEditor, path: Path): NodeEntry<Element> | null {
    const nestedListPath = [...path, NESTED_LIST_PATH_INDEX];

    if (!Node.has(editor, nestedListPath)) {
        return null;
    }

    const nestedList = Node.get(editor, nestedListPath);

    if (Element.isElement(nestedList) && editor.isListNode(nestedList)) {
        // Sanity check.
        return [nestedList, nestedListPath];
    }

    return null;
}
