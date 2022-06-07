import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import {
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    LINK_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
    isParagraphNode,
} from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ParagraphElement } from './components';
import {
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
        },
        elementFallback: {
            [HEADING_1_NODE_TYPE]: paragraph,
            [HEADING_2_NODE_TYPE]: paragraph,
            [LINK_NODE_TYPE]: paragraph,
            [QUOTE_NODE_TYPE]: paragraph,
            P: paragraph, // It has to be in the fallbacks, to allow other extensions to parse specific P tags hierarchies.
            BLOCKQUOTE: paragraph,
            DIV: paragraph,
            BR: paragraph,
            OL: paragraph,
            UL: paragraph,
            LI: paragraph,
            H1: paragraph,
            H2: paragraph,
            H3: paragraph,
            H4: paragraph,
            H5: paragraph,
            H6: paragraph,
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

function paragraph() {
    return { type: PARAGRAPH_NODE_TYPE };
}
