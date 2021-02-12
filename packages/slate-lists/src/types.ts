export interface ListsOptions {
    defaultBlockType: string;
    listItemTextType: string;
    listItemType: string;
    listTypes: string[];
    /**
     * List of types of nodes that can be converted into a "list-item-text"
     */
    wrappableTypes: string[];
}
