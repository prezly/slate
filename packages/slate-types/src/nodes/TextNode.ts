import type { Node } from 'slate';

import type { Stylable } from './interfaces';
import { isObject } from './validation';

export interface TextNode extends Stylable {
    text: string;
}

export namespace TextNode {
    export function isTextNode(node: Node): node is TextNode {
        return isObject(node) && 'text' in node;
    }
}
