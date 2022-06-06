import type { Extension } from '@prezly/slate-commons';
import { isParagraphNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ParagraphElement } from './components';
import { deserialize } from './deserialize';
import {
    normalizeOrphanText,
    normalizeRedundantParagraphAttributes,
    normalizeUnknownElement,
} from './lib';

export const EXTENSION_ID = 'ParagraphsExtension';

export const ParagraphsExtension = (): Extension => ({
    id: EXTENSION_ID,
    deserialize,
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
