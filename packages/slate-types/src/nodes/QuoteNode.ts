import ElementNode, { isElementNode } from './ElementNode';
import InlineNode, { isInlineNode } from './InlineNode';
import TextNode, { isTextNode } from './TextNode';

export const QUOTE_NODE_TYPE = 'block-quote';

export default interface QuoteNode extends ElementNode<typeof QUOTE_NODE_TYPE> {
    children: (InlineNode | TextNode)[];
}

export const isQuoteNode = (value: any): value is QuoteNode => {
    return (
        isElementNode(value) &&
        value.type === QUOTE_NODE_TYPE &&
        Array.isArray(value.children) &&
        value.children.every((node) => isInlineNode(node) || isTextNode(node))
    );
};
