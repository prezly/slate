import type { ListsEditor, ListsSchema } from '@prezly/slate-lists';
import { ListType, withLists, withListsReact } from '@prezly/slate-lists';
import type { ListItemNode, ListItemTextNode } from '@prezly/slate-types';
import {
    BULLETED_LIST_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    isHeadingNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isParagraphNode,
    isQuoteNode,
} from '@prezly/slate-types';
import type { Editor } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

import { createList, createListItem, createListItemText } from './lib';

const SCHEMA: ListsSchema = {
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
    createListNode(type: ListType = ListType.UNORDERED, { children } = {}) {
        return createList({
            type: type === ListType.ORDERED ? NUMBERED_LIST_NODE_TYPE : BULLETED_LIST_NODE_TYPE,
            children: children as ListItemNode[],
        });
    },
    createListItemNode({ children } = {}) {
        return createListItem({
            children: children as [ListItemTextNode],
        });
    },
    createListItemTextNode({ children } = {}) {
        return createListItemText({ children });
    },
};

export function withListsFormatting<T extends Editor>(editor: T): T & ListsEditor {
    return withListsReact(withLists(SCHEMA)(editor));
}
