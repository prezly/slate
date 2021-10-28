import { Element } from 'slate';

export const QUOTE_NODE_TYPE = 'block-quote';

export default interface QuoteNode extends Element {
    type: typeof QUOTE_NODE_TYPE;
}

export const isQuoteNode = (value: any): value is QuoteNode =>
    Element.isElementType(value, QUOTE_NODE_TYPE);
