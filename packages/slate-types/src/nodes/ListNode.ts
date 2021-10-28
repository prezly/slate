import ElementNode, { isElementNode } from './ElementNode';
import InlineNode from './InlineNode';
import TextNode from './TextNode';

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
    children: (InlineNode | TextNode)[];
}

export const isListNode = (value: any): value is ListNode => {
    return (
        isElementNode(value) &&
        (value.type === BULLETED_LIST_NODE_TYPE || value.type === NUMBERED_LIST_NODE_TYPE)
    );
};

export const isListItemNode = (value: any): value is ListItemNode => {
    return isElementNode(value) && value.type === LIST_ITEM_NODE_TYPE;
};

export const isListItemTextNode = (value: any): value is ListItemTextNode => {
    return isElementNode(value) && value.type === LIST_ITEM_TEXT_NODE_TYPE;
};
