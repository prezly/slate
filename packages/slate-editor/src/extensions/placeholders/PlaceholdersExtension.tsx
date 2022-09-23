import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import { AttachmentPlaceholderElement } from './components';
import { fixDuplicatePlaceholderUuid } from './normalization';
import { PlaceholderNode } from './PlaceholderNode';

export const EXTENSION_ID = 'PlaceholdersExtension';

export function PlaceholdersExtension(): Extension {
    return {
        id: EXTENSION_ID,
        isRichBlock: PlaceholderNode.isPlaceholderNode,
        isVoid: PlaceholderNode.isPlaceholderNode,
        normalizeNode: fixDuplicatePlaceholderUuid,
        renderElement({ element, children, attributes }) {
            if (PlaceholderNode.isPlaceholderNode(element)) {
                return (
                    <AttachmentPlaceholderElement attributes={attributes} element={element}>
                        {children}
                    </AttachmentPlaceholderElement>
                );
            }
            return undefined;
        },
    };
}
