import { Element } from 'slate';

export interface ListsOptions {
    /**
     * Type of the node that "listItemTextType" will become when it is unwrapped or normalized.
     */
    defaultBlockType: Element['type'];

    /**
     * Type of the node representing list item text.
     */
    listItemTextType: Element['type'];

    /**
     * Type of the node representing list item.
     */
    listItemType: Element['type'];

    /**
     * Types of nodes representing lists. The first type will be the default type (e.g. when wrapping with lists).
     */
    listTypes: Element['type'][];

    /**
     * Types of nodes that can be converted into a node representing list item text.
     */
    wrappableTypes: Element['type'][];
}
