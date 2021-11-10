import { isPlainObject } from 'is-plain-object';

export interface TextNode {
    bold?: boolean;
    italic?: boolean;
    subscript?: boolean;
    superscript?: boolean;
    text: string;
    underlined?: boolean;
}

export function isTextNode(node: any): node is TextNode {
    return isPlainObject(node) && 'text' in node;
}
