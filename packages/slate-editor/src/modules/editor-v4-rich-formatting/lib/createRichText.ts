import type { RichTextElementType } from '../types';

function createRichText(
    type: RichTextElementType['type'],
    children: RichTextElementType['children'] = [],
): RichTextElementType {
    return {
        children,
        type,
    } as unknown as RichTextElementType;
}

export default createRichText;
