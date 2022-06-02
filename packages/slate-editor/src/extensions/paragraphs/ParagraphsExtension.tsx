import type { Extension } from '@prezly/slate-commons';
import { isParagraphNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ParagraphElement } from './components';
import { PARAGRAPHS_EXTENSION_ID } from './constants';
import { deserialize } from './deserialize';
import {
    normalizeOrphanText,
    normalizeRedundantParagraphAttributes,
    normalizeUnknownElement,
} from './lib';

export const ParagraphsExtension = (): Extension => ({
    deserialize,
    id: PARAGRAPHS_EXTENSION_ID,
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
    // FIXME: Rework normalization
    // rootTypes: [PARAGRAPH_NODE_TYPE],
});
