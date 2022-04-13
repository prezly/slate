import type { BaseEditor, Element, Node } from 'slate';

export enum ListType {
    ORDERED = 'ol',
    UNORDERED = 'ul',
}

export interface ListsSchema {
    isDefaultTextNode<T extends Element = Element>(node: Node): node is T;

    isListNode<T extends Element = Element>(node: Node, type?: ListType): node is T;

    isListItemNode<T extends Element = Element>(node: Node): node is T;

    isListItemTextNode<T extends Element = Element>(node: Node): node is T;

    isListNestable(node: Node): boolean;

    createDefaultTextNode<T extends Element = Element>(props?: Partial<Pick<T, 'children'>>): T;

    createListNode<T extends Element = Element>(
        type?: ListType,
        props?: Partial<Pick<T, 'children'>>,
    ): T;

    createListItemNode<T extends Element = Element>(props?: Partial<Pick<T, 'children'>>): T;

    createListItemTextNode<T extends Element = Element>(props?: Partial<Pick<T, 'children'>>): T;
}

export interface ListsEditor extends ListsSchema, BaseEditor {}
