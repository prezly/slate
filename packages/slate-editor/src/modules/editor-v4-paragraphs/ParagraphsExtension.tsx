import { EditorCommands, Extension, PARAGRAPH_TYPE } from '@prezly/slate-commons';
import React from 'react';
import { RenderElementProps } from 'slate-react';

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
        if (EditorCommands.isParagraphElement(element)) {
            return (
                <ParagraphElement attributes={attributes} element={element}>
                    {children}
                </ParagraphElement>
            );
        }

        return undefined;
    },
    rootTypes: [PARAGRAPH_TYPE],
});

export default ParagraphsExtension;
