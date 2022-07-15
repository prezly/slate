import type { Editor } from 'slate';

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
    isInList,
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
    isInList,
    listItemContainsText,
    mergeListWithPreviousSiblingList,
    moveListItemsToAnotherList,
    moveListToListItem,
    setListType,
    splitListItem,
    unwrapList,
    wrapInList,
};
