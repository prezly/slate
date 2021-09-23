import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { InlineNode, ParagraphNode, TextNode } from '@prezly/slate-types';

const createParagraph = (children: (InlineNode | TextNode)[] = [{ text: '' }]): ParagraphNode => ({
    children,
    type: PARAGRAPH_TYPE,
});

export default createParagraph;
