import type { RichTextElementType } from '../types';

export function createRichText(
    type: RichTextElementType['type'],
    children: RichTextElementType['children'] = [],
): RichTextElementType {
    return {
        children,
        type,
    } as unknown as RichTextElementType;
}
