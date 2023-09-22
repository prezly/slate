import { useRegisterExtension } from '@prezly/slate-commons';
import { isQuoteNode, QUOTE_NODE_TYPE } from '@prezly/slate-types';
import React, { useCallback } from 'react';
import { useSlateStatic } from 'slate-react';

import { onBackspaceResetFormattingAtDocumentStart, resetFormattingOnBreak } from '#lib';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { BlockQuoteElement } from './components';
import { normalizeRedundantAttributes } from './lib';

export const EXTENSION_ID = 'BlockquoteExtension';

export function BlockquoteExtension() {
    const editor = useSlateStatic();

    const insertBreak = useCallback(() => {
        return resetFormattingOnBreak(editor, isQuoteNode);
    }, []);

    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [QUOTE_NODE_TYPE]: () => ({ type: QUOTE_NODE_TYPE }),
                BLOCKQUOTE: () => ({ type: QUOTE_NODE_TYPE }),
            }),
        },
        insertBreak,
        normalizeNode: normalizeRedundantAttributes,
        onKeyDown(event, editor) {
            return onBackspaceResetFormattingAtDocumentStart(editor, isQuoteNode, event);
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
    });
}
