import { ParagraphType } from '@prezly/slate-commons';
import { Node } from 'slate';

import { ElementType, RichTextElementType } from '../types';

const createRichText = (
    type: ElementType | ParagraphType,
    children: Node[] = [],
): RichTextElementType => ({
    children,
    type,
});

export default createRichText;
