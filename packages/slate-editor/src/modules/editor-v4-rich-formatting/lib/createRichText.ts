import type { RichTextElementType } from '../types';

const createRichText = (
    type: RichTextElementType['type'],
    children: RichTextElementType['children'] = [],
): RichTextElementType =>
    ({
        children,
        type,
    } as unknown as RichTextElementType);

export default createRichText;
