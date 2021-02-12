import { Editor, Node, NodeEntry, Range } from 'slate';

import { ListsOptions } from '../types';

import getListItemsInRange from './getListItemsInRange';
import getParentList from './getParentList';

const getListsInRange = (
    options: ListsOptions,
    editor: Editor,
    at: Range | null | undefined,
): NodeEntry<Node>[] => {
    const listItemsInRange = getListItemsInRange(options, editor, at);
    const lists = listItemsInRange
        .map(([, listItemPath]) => getParentList(options, editor, listItemPath))
        .filter((list) => list !== null);
    // TypeScript complains about `null`s even though we filter for them, hence the typecast.
    return lists as NodeEntry<Node>[];
};

export default getListsInRange;
