import { createDeserializeElement, DeserializeHtml, PARAGRAPH_TYPE } from '@prezly/slate-commons';

import { createParagraph, parseSerializedElement } from './lib';

const deserialize: DeserializeHtml = {
    element: {
        [PARAGRAPH_TYPE]: createDeserializeElement(parseSerializedElement),
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

export default deserialize;
