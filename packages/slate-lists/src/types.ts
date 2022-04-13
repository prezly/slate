import type { BaseEditor, Descendant, Element, Node } from 'slate';

export enum ListType {
    ORDERED = 'ol',
    UNORDERED = 'ul',
}

export interface ListsSchema {
    isDefaultTextNode(node: Node): boolean;

    isListNode(node: Node, type?: ListType): boolean;

    isListItemNode(node: Node): boolean;

    isListItemTextNode(node: Node): boolean;

    isListNestable(node: Node): boolean;

    createDefaultTextNode(props?: { children?: Descendant[] }): Element;

    createListNode(type?: ListType, props?: { children?: Descendant[] }): Element;

    createListItemNode(props?: { children?: Descendant[] }): Element;

    createListItemTextNode(props?: { children?: Descendant[] }): Element;
}

export interface ListsEditor extends ListsSchema, BaseEditor {}
