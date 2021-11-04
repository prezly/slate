import { ElementNode } from '@prezly/slate-types';

export interface ListsOptions {
    /**
     * Type of the node that "listItemTextType" will become when it is unwrapped or normalized.
     */
    defaultBlockType: ElementNode['type'];

    /**
     * Type of the node representing list item text.
     */
    listItemTextType: ElementNode['type'];

    /**
     * Type of the node representing list item.
     */
    listItemType: ElementNode['type'];

    /**
     * Types of nodes representing lists. The first type will be the default type (e.g. when wrapping with lists).
     */
    listTypes: ElementNode['type'][];

    /**
     * Types of nodes that can be converted into a node representing list item text.
     */
    wrappableTypes: ElementNode['type'][];
}
