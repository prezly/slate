import ElementNode, { isElementNode } from './ElementNode';
import InlineNode, { isInlineNode } from './InlineNode';

export const PARAGRAPH_NODE_TYPE = 'paragraph';

export default interface ParagraphNode extends ElementNode {
    children: InlineNode[];
    type: typeof PARAGRAPH_NODE_TYPE;
}

export const isParagraphNode = (value: any): value is ParagraphNode => {
    return (
        isElementNode(value) &&
        value.type === PARAGRAPH_NODE_TYPE &&
        Array.isArray(value.children) &&
        value.children.every(isInlineNode)
    );
};
