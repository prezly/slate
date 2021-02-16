import { Editor, Element, NodeEntry, Range } from 'slate';

import { ListsOptions } from '../types';

import getListItemsInRange from './getListItemsInRange';
import getParentList from './getParentList';

/**
 * Returns all "lists" in a given Range.
 * @param at defaults to current selection if not specified
 */
const getListsInRange = (
    options: ListsOptions,
    editor: Editor,
    at: Range | null | undefined,
): NodeEntry<Element>[] => {
    const listItemsInRange = getListItemsInRange(options, editor, at);
    const lists = listItemsInRange
        .map(([, listItemPath]) => getParentList(options, editor, listItemPath))
        .filter((list) => list !== null);
    // TypeScript complains about `null`s even though we filter for them, hence the typecast.
    return lists as NodeEntry<Element>[];
};

export default getListsInRange;
