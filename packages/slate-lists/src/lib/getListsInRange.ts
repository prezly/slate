import type { Element, NodeEntry, Range } from 'slate';

import type { ListsEditor } from '../types';

import { getListItemsInRange } from './getListItemsInRange';
import { getParentList } from './getParentList';

/**
 * Get all lists in the given Range.
 */
export function getListsInRange(editor: ListsEditor, at: Range | null): NodeEntry<Element>[] {
    const listItemsInRange = getListItemsInRange(editor, at);
    const lists = listItemsInRange
        .map(([, listItemPath]) => getParentList(editor, listItemPath))
        .filter((list) => list !== null);
    // TypeScript complains about `null`s even though we filter for them, hence the typecast.
    return lists as NodeEntry<Element>[];
}
