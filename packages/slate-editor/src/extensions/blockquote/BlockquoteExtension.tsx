import type { Extension } from '@prezly/slate-commons';
import { isQuoteNode, QUOTE_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

import { onBackspaceResetFormattingAtDocumentStart, withResetFormattingOnBreak } from '#lib';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { BlockQuoteElement } from './components';
import { normalizeRedundantAttributes } from './lib';

export const EXTENSION_ID = 'BlockquoteExtension';

export function BlockquoteExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [QUOTE_NODE_TYPE]: () => ({ type: QUOTE_NODE_TYPE }),
                BLOCKQUOTE: () => ({ type: QUOTE_NODE_TYPE }),
            }),
        },
        normalizeNode: [normalizeRedundantAttributes],
        onKeyDown(event, editor) {
            onBackspaceResetFormattingAtDocumentStart(editor, isQuoteNode, event);
        },
        renderElement({ attributes, element, children }) {
            if (isQuoteNode(element)) {
                return (
                    <BlockQuoteElement {...attributes} element={element}>
                        {children}
                    </BlockQuoteElement>
                );
            }
            return undefined;
        },
        rootTypes: [QUOTE_NODE_TYPE],
        withOverrides: withResetFormattingOnBreak(isQuoteNode),
    };
}
