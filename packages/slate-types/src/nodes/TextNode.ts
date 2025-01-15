import { type Node, type Text } from '@udecode/plate';

import type { Stylable } from './interfaces';
import { isObject } from './validation';

export interface TextNode extends Text, Stylable {}

export function isTextNode(node: Node): node is TextNode {
    return isObject(node) && 'text' in node;
}
