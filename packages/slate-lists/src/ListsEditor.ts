import type { Editor, Location, Node, NodeEntry, Path, Range } from 'slate';
import type { Element } from 'slate';

import {
    canDeleteBackward,
    getListItemsInRange,
    getListsInRange,
    getListType,
    getNestedList,
    getParentList,
    getParentListItem,
    isCursorAtStartOfListItem,
    isCursorInEmptyListItem,
    isInList,
    isListItemContainingText,
} from './lib';
import * as Registry from './registry';
import {
    decreaseDepth,
    decreaseListItemDepth,
    increaseDepth,
    increaseListItemDepth,
    mergeListWithPreviousSiblingList,
    moveListItemsToAnotherList,
    moveListToListItem,
    setListType,
    splitListItem,
    unwrapList,
    wrapInList,
} from './transformations';
import type { ListsSchema } from './types';
import { ListType } from './types';

function schema(editor: Editor) {
    return Registry.get(editor);
}

export const ListsEditor = {
    // ListsEditor schema availability
    isListsEnabled(editor: Editor): boolean {
        return Registry.has(editor);
    },
    getListsSchema(editor: Editor): ListsSchema | undefined {
        return Registry.has(editor) ? Registry.get(editor) : undefined;
    },

    // Schema proxies
    isConvertibleToListTextNode(editor: Editor, node: Node): boolean {
        return schema(editor).isConvertibleToListTextNode(node);
    },
    isDefaultTextNode(editor: Editor, node: Node): boolean {
        return schema(editor).isDefaultTextNode(node);
    },
    isListNode(editor: Editor, node: Node, type?: ListType): boolean {
        return schema(editor).isListNode(node, type);
    },
    isListItemNode(editor: Editor, node: Node): boolean {
        return schema(editor).isListItemNode(node);
    },
    isListItemTextNode(editor: Editor, node: Node): boolean {
        return schema(editor).isListItemTextNode(node);
    },
    createDefaultTextNode(editor: Editor, props?: Partial<Element>): Element {
        return schema(editor).createDefaultTextNode(props);
    },
    createListNode(editor: Editor, type?: ListType, props?: Partial<Element>): Element {
        return schema(editor).createListNode(type, props);
    },
    createListItemNode(editor: Editor, props?: Partial<Element>): Element {
        return schema(editor).createListItemNode(props);
    },
    createListItemTextNode(editor: Editor, props?: Partial<Element>): Element {
        return schema(editor).createListItemTextNode(props);
    },

    // Own API
    canDeleteBackward(editor: Editor) {
        return canDeleteBackward(editor, schema(editor));
    },
    decreaseDepth(editor: Editor, at?: Location | null) {
        return decreaseDepth(editor, schema(editor), at);
    },
    decreaseListItemDepth(editor: Editor, listItemPath: Path) {
        return decreaseListItemDepth(editor, schema(editor), listItemPath);
    },
    getListItemsInRange(editor: Editor, at?: Location | null) {
        return getListItemsInRange(editor, schema(editor), at);
    },
    getListsInRange(editor: Editor, at: Range | null) {
        return getListsInRange(editor, schema(editor), at);
    },
    getListType(editor: Editor, node: Node) {
        return getListType(schema(editor), node);
    },
    getNestedList(editor: Editor, path: Path) {
        return getNestedList(editor, schema(editor), path);
    },
    getParentList(editor: Editor, path: Path) {
        return getParentList(editor, schema(editor), path);
    },
    getParentListItem(editor: Editor, path: Path) {
        return getParentListItem(editor, schema(editor), path);
    },
    increaseDepth(editor: Editor) {
        return increaseDepth(editor, schema(editor));
    },
    increaseListItemDepth(editor: Editor, listItemPath: Path) {
        return increaseListItemDepth(editor, schema(editor), listItemPath);
    },
    isCursorAtStartOfListItem(editor: Editor) {
        return isCursorAtStartOfListItem(editor, schema(editor));
    },
    isCursorInEmptyListItem(editor: Editor) {
        return isCursorInEmptyListItem(editor, schema(editor));
    },
    isInList(editor: Editor, location?: Location | null) {
        return isInList(editor, schema(editor), location);
    },
    isListItemContainingText(editor: Editor, node: Node) {
        return isListItemContainingText(editor, schema(editor), node);
    },
    mergeListWithPreviousSiblingList(editor: Editor, entry: NodeEntry) {
        return mergeListWithPreviousSiblingList(editor, schema(editor), entry);
    },
    moveListItemsToAnotherList(
        editor: Editor,
        parameters: Parameters<typeof moveListItemsToAnotherList>[2],
    ) {
        return moveListItemsToAnotherList(editor, schema(editor), parameters);
    },
    moveListToListItem(editor: Editor, parameters: Parameters<typeof moveListToListItem>[2]) {
        return moveListToListItem(editor, schema(editor), parameters);
    },
    setListType(editor: Editor, listType: ListType) {
        return setListType(editor, schema(editor), listType);
    },
    splitListItem(editor: Editor) {
        return splitListItem(editor, schema(editor));
    },
    unwrapList(editor: Editor) {
        return unwrapList(editor, schema(editor));
    },
    wrapInList(editor: Editor, listType = ListType.UNORDERED) {
        return wrapInList(editor, schema(editor), listType);
    },
};
