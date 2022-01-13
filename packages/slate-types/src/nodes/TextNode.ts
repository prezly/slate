import { isPlainObject } from 'is-plain-object';

import type { Stylable } from './interfaces';

export interface TextNode extends Stylable {
    text: string;
}

export function isTextNode(node: any): node is TextNode {
    return isPlainObject(node) && 'text' in node;
}
