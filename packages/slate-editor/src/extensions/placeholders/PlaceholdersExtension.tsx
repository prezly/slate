import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import { Placeholder } from './components';
import { PlaceholderNode } from './PlaceholderNode';

export const EXTENSION_ID = 'PlaceholdersExtension';

export function PlaceholdersExtension(): Extension {
    return {
        id: EXTENSION_ID,
        isRichBlock: PlaceholderNode.isPlaceholderNode,
        isVoid: PlaceholderNode.isPlaceholderNode,
        renderElement({ element, children, attributes }) {
            if (PlaceholderNode.isPlaceholderNode(element)) {
                return (
                    <Placeholder attributes={attributes} element={element}>
                        {children}
                    </Placeholder>
                );
            }
            return undefined;
        },
    };
}
