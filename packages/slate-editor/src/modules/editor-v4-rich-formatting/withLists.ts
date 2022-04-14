import type { ListsEditor, ListsSchema } from '@prezly/slate-lists';
import { ListType, withLists as withListsMethods, withListsReact } from '@prezly/slate-lists';
import {
    BULLETED_LIST_NODE_TYPE,
    isHeadingNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
} from '@prezly/slate-types';
import type { Editor } from 'slate';

const SCHEMA: ListsSchema = {
    isAllowedListDescendant(node): boolean {
        return isParagraphNode(node) || isHeadingNode(node) || isQuoteNode(node);
    },
    isDefaultTextNode: isParagraphNode,
    isListNode(node, type?) {
        if (type === ListType.ORDERED) {
            return isListNode(node, NUMBERED_LIST_NODE_TYPE);
        }
        if (type === ListType.UNORDERED) {
            return isListNode(node, BULLETED_LIST_NODE_TYPE);
        }
        return isListNode(node);
    },
    isListItemNode,
    isListItemTextNode,
    createDefaultTextNode(props = {}) {
        return { children: [{ text: '' }], ...props, type: PARAGRAPH_NODE_TYPE };
    },
    createListNode(type: ListType = ListType.UNORDERED, props = {}) {
        return {
            children: [{ text: '' }],
            ...props,
            type: type === ListType.ORDERED ? NUMBERED_LIST_NODE_TYPE : BULLETED_LIST_NODE_TYPE,
        };
    },
    createListItemNode(props = {}) {
        return { children: [{ text: '' }], ...props, type: LIST_ITEM_NODE_TYPE };
    },
    createListItemTextNode(props = {}) {
        return { children: [{ text: '' }], ...props, type: LIST_ITEM_TEXT_NODE_TYPE };
    },
};

export function withLists<T extends Editor>(editor: T): T & ListsEditor {
    return withListsReact(withListsMethods(SCHEMA)(editor));
}
