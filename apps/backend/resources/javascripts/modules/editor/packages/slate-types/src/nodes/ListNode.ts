import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import type { Alignable } from './interfaces';

export const BULLETED_LIST_NODE_TYPE = 'bulleted-list';
export const NUMBERED_LIST_NODE_TYPE = 'numbered-list';
export const LIST_ITEM_NODE_TYPE = 'list-item';
export const LIST_ITEM_TEXT_NODE_TYPE = 'list-item-text';

type ListType = typeof BULLETED_LIST_NODE_TYPE | typeof NUMBERED_LIST_NODE_TYPE;

export interface ListNode<T extends ListType = ListType> extends ElementNode, Alignable {
    type: T;
    children: ListItemNode[];
}

export interface ListItemNode extends ElementNode {
    type: typeof LIST_ITEM_NODE_TYPE;
    children: [ListItemTextNode] | [ListItemTextNode, ListNode];
}

export interface ListItemTextNode extends ElementNode {
    type: typeof LIST_ITEM_TEXT_NODE_TYPE;
}

export function isListNode(value: any): value is ListNode;
export function isListNode<T extends ListType>(value: any, type: T): value is ListNode<T>;
export function isListNode(value: any, type?: ListType): boolean {
    return type
        ? isElementNode<ListNode>(value, type)
        : isElementNode<ListNode>(value, [BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE]);
}

export function isListItemNode(value: any): value is ListItemNode {
    return isElementNode<ListItemNode>(value, LIST_ITEM_NODE_TYPE);
}

export function isListItemTextNode(value: any): value is ListItemTextNode {
    return isElementNode<ListItemTextNode>(value, LIST_ITEM_TEXT_NODE_TYPE);
}
