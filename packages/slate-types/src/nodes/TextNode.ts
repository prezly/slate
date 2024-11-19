import type { TText } from '@udecode/plate-common';
import type { Node } from 'slate';

import type { Stylable } from './interfaces';
import { isObject } from './validation';

export interface TextNode extends TText, Stylable {}

export function isTextNode(node: Node): node is TextNode {
    return isObject(node) && 'text' in node;
}
