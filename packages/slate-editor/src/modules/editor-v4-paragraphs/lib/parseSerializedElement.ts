import type { ParagraphNode } from '@prezly/slate-types';
import { isParagraphNode } from '@prezly/slate-types';

import createParagraph from './createParagraph';

const parseSerializedElement = (serialized: string): ParagraphNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isParagraphNode(parsed)) {
        return createParagraph(parsed.children);
    }

    return undefined;
};

export default parseSerializedElement;
