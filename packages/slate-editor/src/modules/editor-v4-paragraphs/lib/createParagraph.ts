import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

const createParagraph = (children: ParagraphNode['children'] = [{ text: '' }]): ParagraphNode => ({
    type: PARAGRAPH_NODE_TYPE,
    children,
});

export default createParagraph;
