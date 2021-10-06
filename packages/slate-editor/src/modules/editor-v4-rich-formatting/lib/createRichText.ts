import { RichTextElementType } from '../types';

const createRichText = (
    type: RichTextElementType['type'],
    children: RichTextElementType['children'] = [],
): RichTextElementType => ({
    children,
    type,
});

export default createRichText;
