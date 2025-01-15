import type { TText, TNode } from '@udecode/plate';

import type { Stylable } from './interfaces';
import { isObject } from './validation';

export interface TextNode extends TText, Stylable {}

export function isTextNode(node: TNode): node is TextNode {
    return isObject(node) && 'text' in node;
}
