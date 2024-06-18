import type { Extension } from '@prezly/slate-commons';
import { CalloutNode } from '@prezly/slate-types';
import React from 'react';

import { onBackspaceResetFormattingAtDocumentStart, withResetFormattingOnBreak } from '#lib';

import { CalloutElement } from './components';
import { normalizeRedundantAttributes } from './lib';

export const EXTENSION_ID = 'CalloutExtension';

export function CalloutExtension(): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode: [normalizeRedundantAttributes],
        onKeyDown(event, editor) {
            return onBackspaceResetFormattingAtDocumentStart(
                editor,
                CalloutNode.isCalloutNode,
                event,
            );
        },
        renderElement({ attributes, element, children }) {
            if (CalloutNode.isCalloutNode(element)) {
                return (
                    <CalloutElement {...attributes} element={element}>
                        {children}
                    </CalloutElement>
                );
            }
            return undefined;
        },
        withOverrides: withResetFormattingOnBreak(CalloutNode.isCalloutNode),
    };
}
