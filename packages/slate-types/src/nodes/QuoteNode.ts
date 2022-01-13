import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import type { Alignable } from './interfaces';

export const QUOTE_NODE_TYPE = 'block-quote';

export interface QuoteNode extends ElementNode, Alignable {
    type: typeof QUOTE_NODE_TYPE;
}

export function isQuoteNode(value: any): value is QuoteNode {
    return isElementNode<QuoteNode>(value, QUOTE_NODE_TYPE);
}
