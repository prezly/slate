import type { Editor, Element, Location, NodeEntry } from 'slate';

import type { ListsSchema } from '../types';

import { getListItemsInRange } from './getListItemsInRange';
import { getParentList } from './getParentList';

/**
 * Get all lists in the given Range.
 */
export function getListsInRange(
    editor: Editor,
    schema: ListsSchema,
    at: Location | null,
): NodeEntry<Element>[] {
    const listItemsInRange = getListItemsInRange(editor, schema, at);
    const lists = listItemsInRange
        .map(([, listItemPath]) => getParentList(editor, schema, listItemPath))
        .filter((list) => list !== null);
    // TypeScript complains about `null`s even though we filter for them, hence the typecast.
    return lists as NodeEntry<Element>[];
}
