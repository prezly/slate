import { ListItemNode, ListItemTextNode, TextNode } from '@prezly/slate-types';

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

declare module 'slate' {
    interface AdditionalCustomTypes {
        Element: ListItemNode | ListItemTextNode;
        Text: TextNode;
    }
}
