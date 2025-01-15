import {
    type Element,
    ElementApi,
    NodeApi,
    type NodeEntry,
    type Path,
    type SlateEditor,
} from '@udecode/plate';

import { NESTED_LIST_PATH_INDEX } from '../constants';
import type { ListsSchema } from '../types';

/**
 * Returns "list" node nested in "list-item" at a given path.
 * Returns null if there is no nested "list".
 */
export function getNestedList(
    editor: SlateEditor,
    schema: ListsSchema,
    path: Path,
): NodeEntry<Element> | null {
    const nestedListPath = [...path, NESTED_LIST_PATH_INDEX];

    if (!NodeApi.has(editor, nestedListPath)) {
        return null;
    }

    const nestedList = NodeApi.get(editor, nestedListPath);

    if (ElementApi.isElement(nestedList) && schema.isListNode(nestedList)) {
        // Sanity check.
        return [nestedList, nestedListPath];
    }

    return null;
}
