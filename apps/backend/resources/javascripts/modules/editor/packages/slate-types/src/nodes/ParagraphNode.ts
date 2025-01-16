import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import type { Alignable } from './interfaces';

export const PARAGRAPH_NODE_TYPE = 'paragraph';

export interface ParagraphNode extends ElementNode, Alignable {
    type: typeof PARAGRAPH_NODE_TYPE;
}

export function isParagraphNode(value: any): value is ParagraphNode {
    return isElementNode<ParagraphNode>(value, PARAGRAPH_NODE_TYPE);
}
