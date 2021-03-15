import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { Node } from 'slate';

import { ParagraphElementType } from '../types';

const createParagraph = (children: Node[] = [{ text: '' }]): ParagraphElementType => ({
    children,
    type: PARAGRAPH_TYPE,
});

export default createParagraph;
