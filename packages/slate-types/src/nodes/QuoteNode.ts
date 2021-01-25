import ElementNode, { isElementNode } from './ElementNode';
import InlineNode, { isInlineNode } from './InlineNode';

export const QUOTE_NODE_TYPE = 'block-quote';

export default interface QuoteNode extends ElementNode<typeof QUOTE_NODE_TYPE> {
    children: InlineNode[];
}

export const isQuoteNode = (value: any): value is QuoteNode => {
    return (
        isElementNode(value) &&
        value.type === QUOTE_NODE_TYPE &&
        Array.isArray(value.children) &&
        value.children.every(isInlineNode)
    );
};
