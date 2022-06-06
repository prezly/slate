import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isParagraphNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ParagraphElement } from './components';
import {
    createParagraph,
    normalizeOrphanText,
    normalizeRedundantParagraphAttributes,
    normalizeUnknownElement,
    parseSerializedElement,
} from './lib';

export const EXTENSION_ID = 'ParagraphsExtension';

export const ParagraphsExtension = (): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: {
            [PARAGRAPH_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            BR: () => createParagraph(),
            DIV: () => createParagraph(),
            FONT: () => createParagraph(),
            H1: () => createParagraph(), // FIXME
            H2: () => createParagraph(), // FIXME
            H3: () => createParagraph(), // FIXME
            H4: () => createParagraph(), // FIXME
            H5: () => createParagraph(), // FIXME
            H6: () => createParagraph(), // FIXME
            P: () => createParagraph(),
        },
    },
    normalizeNode: [
        normalizeOrphanText,
        normalizeRedundantParagraphAttributes,
        normalizeUnknownElement,
    ],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isParagraphNode(element)) {
            return (
                <ParagraphElement attributes={attributes} element={element}>
                    {children}
                </ParagraphElement>
            );
        }

        return undefined;
    },
    rootTypes: [PARAGRAPH_NODE_TYPE],
});
