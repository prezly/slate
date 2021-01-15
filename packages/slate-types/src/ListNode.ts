import InlineNode from './InlineNode';

export default interface ListNode {
    children: ListItemNode[];
    type: 'bulleted-list' | 'numbered-list';
}

export interface ListItemNode {
    children: [ListItemTextNode] | [ListItemTextNode, ListNode];
    type: 'list-item';
}

export interface ListItemTextNode {
    children: InlineNode[];
    type: 'list-item-text';
}
