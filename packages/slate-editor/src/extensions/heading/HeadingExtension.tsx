import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE, isHeadingNode } from '@prezly/slate-types';
import React from 'react';

import { onBackspaceResetFormattingAtDocumentStart, withResetFormattingOnBreak } from '#lib';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { HeadingElement } from './components';
import { normalizeRedundantAttributes, parseHeadingElement } from './lib';

export const EXTENSION_ID = 'HeadingExtension';

export function HeadingExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [HEADING_1_NODE_TYPE]: createDeserializeElement(parseHeadingElement),
                [HEADING_2_NODE_TYPE]: createDeserializeElement(parseHeadingElement),
                H1: () => ({ type: HEADING_1_NODE_TYPE }),
                H2: () => ({ type: HEADING_2_NODE_TYPE }),
                H3: () => ({ type: HEADING_2_NODE_TYPE }),
                H4: () => ({ type: HEADING_2_NODE_TYPE }),
                H5: () => ({ type: HEADING_2_NODE_TYPE }),
                H6: () => ({ type: HEADING_2_NODE_TYPE }),
            }),
        },
        normalizeNode: [normalizeRedundantAttributes],
        onKeyDown(event, editor) {
            onBackspaceResetFormattingAtDocumentStart(editor, isHeadingNode, event);
        },
        renderElement({ attributes, children, element }) {
            if (isHeadingNode(element)) {
                return (
                    <HeadingElement {...attributes} element={element}>
                        {children}
                    </HeadingElement>
                );
            }
            return undefined;
        },
        withOverrides: withResetFormattingOnBreak(isHeadingNode),
    };
}
