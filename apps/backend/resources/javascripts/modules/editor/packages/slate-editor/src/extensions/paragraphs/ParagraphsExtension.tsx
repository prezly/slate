import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { Alignment } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE, isParagraphNode } from '@prezly/slate-types';
import { type RenderElementProps } from '@udecode/plate';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { ParagraphElement } from './components';
import {
    normalizeRedundantParagraphAttributes,
    normalizeUnknownElement,
    parseSerializedElement,
} from './lib';

export const EXTENSION_ID = 'ParagraphsExtension';

interface Parameters {
    defaultAlignment: Alignment;
}

export const ParagraphsExtension = ({ defaultAlignment }: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [PARAGRAPH_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
        elementFallback: composeElementDeserializer({
            P: paragraph, // It has to be in the fallbacks, to allow other extensions to parse specific P tags hierarchies.
            DIV: paragraph, // It has to be in the fallbacks, to allow other extensions to parse specific DIV tags hierarchies.
            BR: paragraph,
        }),
    },
    normalizeNode: [normalizeRedundantParagraphAttributes, normalizeUnknownElement],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isParagraphNode(element)) {
            return (
                <ParagraphElement
                    attributes={attributes}
                    defaultAlignment={defaultAlignment}
                    element={element}
                >
                    {children}
                </ParagraphElement>
            );
        }

        return undefined;
    },
});

function paragraph() {
    return { type: PARAGRAPH_NODE_TYPE };
}
