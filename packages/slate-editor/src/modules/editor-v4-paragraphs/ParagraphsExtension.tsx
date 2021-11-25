import type { Extension } from '@prezly/slate-commons';
import { isParagraphNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import * as React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ParagraphElement } from './components';
import { PARAGRAPHS_EXTENSION_ID } from './constants';
import deserialize from './deserialize';
import {
    normalizeOrphanText,
    normalizeRedundantParagraphAttributes,
    normalizeUnknownElement,
} from './lib';

const ParagraphsExtension = (): Extension => ({
    deserialize,
    id: PARAGRAPHS_EXTENSION_ID,
    normalizers: [
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

export default ParagraphsExtension;
