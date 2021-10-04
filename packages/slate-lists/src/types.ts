import { InlineNode, TextNode } from '@prezly/slate-types';

export interface ListsOptions {
    /**
     * Type of the node that "listItemTextType" will become when it is unwrapped or normalized.
     */
    defaultBlockType: string;

    /**
     * Type of the node representing list item text.
     */
    listItemTextType: string;

    /**
     * Type of the node representing list item.
     */
    listItemType: string;

    /**
     * Types of nodes representing lists. The first type will be the default type (e.g. when wrapping with lists).
     */
    listTypes: string[];

    /**
     * Types of nodes that can be converted into a node representing list item text.
     */
    wrappableTypes: string[];
}

export default interface ElementNode<T extends string = string> extends Record<string, unknown> {
    children: (ElementNode<string> | TextNode)[];
    type: T;
}

export interface ListNode {
    children: ListItemNode[];
    type: 'bulleted-list' | 'numbered-list';
}

export interface ListItemNode {
    children: [ListItemTextNode] | [ListItemTextNode, ListNode];
    type: 'list-item';
}

export interface ListItemTextNode {
    children: (InlineNode | TextNode)[];
    type: 'list-item-text';
}

declare module 'slate' {
    interface AdditionalCustomTypes {
        Element: ListNode | ListItemNode | ListItemTextNode;
        Text: TextNode;
    }
}
