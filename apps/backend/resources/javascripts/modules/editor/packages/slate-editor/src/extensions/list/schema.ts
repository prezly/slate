import type { ListsSchema } from '@prezly/slate-lists';
import { ListType } from '@prezly/slate-lists';
import type { ListItemNode, ListNode } from '@prezly/slate-types';
import {
    BULLETED_LIST_NODE_TYPE,
    isHeadingNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
    NUMBERED_LIST_NODE_TYPE,
} from '@prezly/slate-types';

import { createParagraph } from '#extensions/paragraphs';

import { createList, createListItem, createListItemText } from './lib';

export const schema: ListsSchema = {
    isConvertibleToListTextNode(node) {
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
        return createParagraph(props);
    },
    createListNode(type: ListType = ListType.UNORDERED, props = {}) {
        return createList({
            ...(props as Partial<ListNode>),
            type: type === ListType.ORDERED ? NUMBERED_LIST_NODE_TYPE : BULLETED_LIST_NODE_TYPE,
        });
    },
    createListItemNode(props = {}) {
        return createListItem({
            ...(props as Partial<ListItemNode>),
        });
    },
    createListItemTextNode(props = {}) {
        return createListItemText(props);
    },
};
