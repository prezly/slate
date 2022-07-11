import type { Editor } from 'slate';

export * as Normalizations from './normalizations';
export { onKeyDown } from './onKeyDown';
export { ListType, type ListsSchema } from './types';
export { withLists } from './withLists';
export { withListsReact } from './withListsReact';

import {
    canDeleteBackward,
    decreaseDepth,
    decreaseListItemDepth,
    getListItemsInRange,
    getListsInRange,
    getListType,
    getNestedList,
    getParentList,
    getParentListItem,
    increaseDepth,
    increaseListItemDepth,
    isCursorAtStartOfListItem,
    isCursorInEmptyListItem,
    listItemContainsText,
    mergeListWithPreviousSiblingList,
    moveListItemsToAnotherList,
    moveListToListItem,
    setListType,
    splitListItem,
    unwrapList,
    wrapInList,
} from './lib';
import type { ListsEditor as Type } from './types';

export type ListsEditor = Type; // Workaround name collision

export const ListsEditor = {
    isListsEditor<T extends Editor>(editor: T): editor is T & ListsEditor {
        return 'isListNode' in editor;
    },

    canDeleteBackward,
    decreaseDepth,
    decreaseListItemDepth,
    getListItemsInRange,
    getListsInRange,
    getListType,
    getNestedList,
    getParentList,
    getParentListItem,
    increaseDepth,
    increaseListItemDepth,
    isCursorAtStartOfListItem,
    isCursorInEmptyListItem,
    listItemContainsText,
    mergeListWithPreviousSiblingList,
    moveListItemsToAnotherList,
    moveListToListItem,
    setListType,
    splitListItem,
    unwrapList,
    wrapInList,
};
