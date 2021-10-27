import ElementNode, { isElementNode } from './ElementNode';
import InlineNode from './InlineNode';
import TextNode from './TextNode';

export const PARAGRAPH_NODE_TYPE = 'paragraph';

export default interface ParagraphNode extends ElementNode<typeof PARAGRAPH_NODE_TYPE> {
    children: (InlineNode | TextNode)[];
}

export const isParagraphNode = (value: any): value is ParagraphNode => {
    return isElementNode(value) && value.type === PARAGRAPH_NODE_TYPE;
};
