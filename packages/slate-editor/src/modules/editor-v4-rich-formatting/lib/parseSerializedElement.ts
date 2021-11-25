import type { RichTextElementType } from '../types';

import createRichText from './createRichText';
import isRichTextElement from './isRichTextElement';

const parseSerializedElement = (serialized: string): RichTextElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isRichTextElement(parsed)) {
        return createRichText(parsed.type, parsed.children);
    }

    return undefined;
};

export default parseSerializedElement;
