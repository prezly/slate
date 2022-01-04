import type { DeserializeHtml } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

import { createParagraph, parseSerializedElement } from './lib';

export const deserialize: DeserializeHtml = {
    element: {
        [PARAGRAPH_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        BR: () => createParagraph(),
        DIV: () => createParagraph(),
        FONT: () => createParagraph(),
        H1: () => createParagraph(),
        H2: () => createParagraph(),
        H3: () => createParagraph(),
        H4: () => createParagraph(),
        H5: () => createParagraph(),
        H6: () => createParagraph(),
        P: () => createParagraph(),
    },
};
