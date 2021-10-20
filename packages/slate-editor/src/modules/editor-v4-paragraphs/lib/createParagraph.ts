import { InlineNode, ParagraphNode, PARAGRAPH_NODE_TYPE, TextNode } from '@prezly/slate-types';

const createParagraph = (children: (InlineNode | TextNode)[] = [{ text: '' }]): ParagraphNode => ({
    children,
    type: PARAGRAPH_NODE_TYPE,
});

export default createParagraph;
