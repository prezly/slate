import { Element } from 'slate';

import ElementNode from './ElementNode';

export const BULLETED_LIST_NODE_TYPE = 'bulleted-list';

export const NUMBERED_LIST_NODE_TYPE = 'numbered-list';

export const LIST_ITEM_NODE_TYPE = 'list-item';

export const LIST_ITEM_TEXT_NODE_TYPE = 'list-item-text';

export default interface ListNode extends ElementNode {
    type: typeof BULLETED_LIST_NODE_TYPE | typeof NUMBERED_LIST_NODE_TYPE;
    children: ListItemNode[];
}

export interface ListItemNode extends ElementNode {
    type: typeof LIST_ITEM_NODE_TYPE;
    children: [ListItemTextNode] | [ListItemTextNode, ListNode];
}

export interface ListItemTextNode extends ElementNode {
    type: typeof LIST_ITEM_TEXT_NODE_TYPE;
}

export const isListNode = (value: any): value is ListNode =>
    Element.isElementType(value, BULLETED_LIST_NODE_TYPE) ||
    Element.isElementType(value, NUMBERED_LIST_NODE_TYPE);

export const isListItemNode = (value: any): value is ListItemNode =>
    Element.isElementType(value, LIST_ITEM_NODE_TYPE);

export const isListItemTextNode = (value: any): value is ListItemTextNode =>
    Element.isElementType(value, LIST_ITEM_TEXT_NODE_TYPE);
