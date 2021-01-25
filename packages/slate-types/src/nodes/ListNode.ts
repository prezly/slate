import ElementNode, { isElementNode } from './ElementNode';
import InlineNode, { isInlineNode } from './InlineNode';

export const BULLETED_LIST_NODE_TYPE = 'bulleted-list';

export const NUMBERED_LIST_NODE_TYPE = 'numbered-list';

export const LIST_ITEM_NODE_TYPE = 'list-item';

export const LIST_ITEM_TEXT_NODE_TYPE = 'list-item-text';

export default interface ListNode
    extends ElementNode<typeof BULLETED_LIST_NODE_TYPE | typeof NUMBERED_LIST_NODE_TYPE> {
    children: ListItemNode[];
}

export interface ListItemNode extends ElementNode<typeof LIST_ITEM_NODE_TYPE> {
    children: [ListItemTextNode] | [ListItemTextNode, ListNode];
}

export interface ListItemTextNode extends ElementNode<typeof LIST_ITEM_TEXT_NODE_TYPE> {
    children: InlineNode[];
}

export const isListNode = (value: any): value is ListNode => {
    return (
        isElementNode(value) &&
        [BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE].includes(value.type) &&
        Array.isArray(value.children) &&
        value.children.every(isListItemNode)
    );
};

export const isListItemNode = (value: any): value is ListItemNode => {
    return (
        isElementNode(value) &&
        value.type === LIST_ITEM_NODE_TYPE &&
        Array.isArray(value.children) &&
        value.children.length > 0 &&
        value.children.length <= 2 &&
        isListItemTextNode(value.children[0]) &&
        (value.children.length === 2 ? isListNode(value.children[1]) : true)
    );
};

export const isListItemTextNode = (value: any): value is ListItemTextNode => {
    return (
        isElementNode(value) &&
        value.type === LIST_ITEM_TEXT_NODE_TYPE &&
        Array.isArray(value.children) &&
        value.children.every(isInlineNode)
    );
};
