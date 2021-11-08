import ElementNode, { isElementNode } from './ElementNode';

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
    isElementNode<ListNode>(value, [BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE]);

export const isListItemNode = (value: any): value is ListItemNode =>
    isElementNode<ListItemNode>(value, LIST_ITEM_NODE_TYPE);

export const isListItemTextNode = (value: any): value is ListItemTextNode =>
    isElementNode<ListItemTextNode>(value, LIST_ITEM_TEXT_NODE_TYPE);
