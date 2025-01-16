import type { SlateEditor } from '@udecode/plate-common';
import type { Element, Location, Node, NodeEntry, Path, Range } from 'slate';

import {
    isDeleteBackwardAllowed,
    getListItems,
    getLists,
    getListType,
    getNestedList,
    getParentList,
    getParentListItem,
    isAtStartOfListItem,
    isAtEmptyListItem,
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

function schema(editor: SlateEditor) {
    return Registry.get(editor);
}

export const ListsEditor = {
    // ListsEditor schema availability
    isListsEnabled(editor: SlateEditor): boolean {
        return Registry.has(editor);
    },
    getListsSchema(editor: SlateEditor): ListsSchema | undefined {
        return Registry.has(editor) ? Registry.get(editor) : undefined;
    },

    // Schema proxies
    isConvertibleToListTextNode(editor: SlateEditor, node: Node): boolean {
        return schema(editor).isConvertibleToListTextNode(node);
    },
    isDefaultTextNode(editor: SlateEditor, node: Node): boolean {
        return schema(editor).isDefaultTextNode(node);
    },
    isListNode(editor: SlateEditor, node: Node, type?: ListType): boolean {
        return schema(editor).isListNode(node, type);
    },
    isListItemNode(editor: SlateEditor, node: Node): boolean {
        return schema(editor).isListItemNode(node);
    },
    isListItemTextNode(editor: SlateEditor, node: Node): boolean {
        return schema(editor).isListItemTextNode(node);
    },
    createDefaultTextNode(editor: SlateEditor, props?: Partial<Element>): Element {
        return schema(editor).createDefaultTextNode(props);
    },
    createListNode(editor: SlateEditor, type?: ListType, props?: Partial<Element>): Element {
        return schema(editor).createListNode(type, props);
    },
    createListItemNode(editor: SlateEditor, props?: Partial<Element>): Element {
        return schema(editor).createListItemNode(props);
    },
    createListItemTextNode(editor: SlateEditor, props?: Partial<Element>): Element {
        return schema(editor).createListItemTextNode(props);
    },

    // Checks & Getters
    isDeleteBackwardAllowed(editor: SlateEditor, at?: Location | null) {
        return isDeleteBackwardAllowed(editor, schema(editor), at);
    },
    isAtStartOfListItem(editor: SlateEditor, at?: Location | null) {
        return isAtStartOfListItem(editor, schema(editor), at);
    },
    isAtEmptyListItem(editor: SlateEditor, at?: Location | null) {
        return isAtEmptyListItem(editor, schema(editor), at);
    },
    isAtList(editor: SlateEditor, at?: Location | null) {
        return isInList(editor, schema(editor), at);
    },
    isListItemContainingText(editor: SlateEditor, node: Node) {
        return isListItemContainingText(editor, schema(editor), node);
    },
    getLists(editor: SlateEditor, at: Range | null) {
        return getLists(editor, schema(editor), at);
    },
    getListItems(editor: SlateEditor, at?: Location | null) {
        return getListItems(editor, schema(editor), at);
    },
    getListType(editor: SlateEditor, node: Node) {
        return getListType(schema(editor), node);
    },
    getNestedList(editor: SlateEditor, path: Path) {
        return getNestedList(editor, schema(editor), path);
    },
    getParentList(editor: SlateEditor, path: Path) {
        return getParentList(editor, schema(editor), path);
    },
    getParentListItem(editor: SlateEditor, path: Path) {
        return getParentListItem(editor, schema(editor), path);
    },

    // Transformations
    increaseDepth(editor: SlateEditor, at?: Location | null) {
        return increaseDepth(editor, schema(editor), at);
    },
    increaseListItemDepth(editor: SlateEditor, listItemPath: Path) {
        return increaseListItemDepth(editor, schema(editor), listItemPath);
    },
    decreaseDepth(editor: SlateEditor, at?: Location | null) {
        return decreaseDepth(editor, schema(editor), at);
    },
    decreaseListItemDepth(editor: SlateEditor, listItemPath: Path) {
        return decreaseListItemDepth(editor, schema(editor), listItemPath);
    },
    mergeListWithPreviousSiblingList(editor: SlateEditor, entry: NodeEntry) {
        return mergeListWithPreviousSiblingList(editor, schema(editor), entry);
    },
    moveListItemsToAnotherList(
        editor: SlateEditor,
        parameters: Parameters<typeof moveListItemsToAnotherList>[2],
    ) {
        return moveListItemsToAnotherList(editor, schema(editor), parameters);
    },
    moveListToListItem(editor: SlateEditor, parameters: Parameters<typeof moveListToListItem>[2]) {
        return moveListToListItem(editor, schema(editor), parameters);
    },
    setListType(editor: SlateEditor, listType: ListType, at?: Location | null) {
        return setListType(editor, schema(editor), listType, at);
    },
    splitListItem(editor: SlateEditor, at?: Location | null) {
        return splitListItem(editor, schema(editor), at);
    },
    unwrapList(editor: SlateEditor, at?: Location | null) {
        return unwrapList(editor, schema(editor), at);
    },
    wrapInList(editor: SlateEditor, listType = ListType.UNORDERED, at?: Location | null) {
        return wrapInList(editor, schema(editor), listType, at);
    },
};
