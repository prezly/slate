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
     * Types of nodes representing lists.
     */
    listTypes: string[];

    /**
     * Types of nodes that can be converted into a node representing list item text.
     */
    wrappableTypes: string[];
}
