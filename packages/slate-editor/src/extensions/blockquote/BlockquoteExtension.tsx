import type { Extension } from '@prezly/slate-commons';
import { isQuoteNode, QUOTE_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

import { BlockQuoteElement } from './components';
import { normalizeRedundantAttributes } from './lib';

export const EXTENSION_ID = 'BlockquoteExtension';

export function BlockquoteExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: {
                [QUOTE_NODE_TYPE]: () => ({ type: QUOTE_NODE_TYPE }),
                BLOCKQUOTE: () => ({ type: QUOTE_NODE_TYPE }),
            },
        },
        normalizeNode: [normalizeRedundantAttributes],
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
    };
}
