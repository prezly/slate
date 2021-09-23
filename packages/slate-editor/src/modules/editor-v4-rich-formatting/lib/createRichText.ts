import { InlineNode } from '@prezly/slate-types';

import { RichTextElementType } from '../types';

const createRichText = (
    type: RichTextElementType['type'],
    children: InlineNode[] = [],
): RichTextElementType => ({
    children,
    type,
});

export default createRichText;
