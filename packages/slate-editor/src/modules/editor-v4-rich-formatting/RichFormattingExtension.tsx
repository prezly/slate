import type { Extension } from '@prezly/slate-commons';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { RichTextElement, Text } from './components';
import { RICH_FORMATTING_EXTENSION_ID } from './constants';
import { createDeserialize } from './createDeserialize';
import { createOnKeyDown } from './createOnKeyDown';
import { isRichTextElement, normalizeRedundantRichTextAttributes } from './lib';
import type { RichFormattingExtensionParameters } from './types';
import { ElementType } from './types';

export const RichFormattingExtension = (
    parameters: RichFormattingExtensionParameters,
): Extension => ({
    id: RICH_FORMATTING_EXTENSION_ID,
    deserialize: createDeserialize(parameters),
    inlineTypes: [],
    normalizers: [normalizeRedundantRichTextAttributes],
    onKeyDown: createOnKeyDown(parameters),
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (parameters.blocks && isRichTextElement(element)) {
            return (
                <RichTextElement attributes={attributes} element={element}>
                    {children}
                </RichTextElement>
            );
        }

        return undefined;
    },
    renderLeaf: Text,
    rootTypes: [
        PARAGRAPH_NODE_TYPE,
        ElementType.BLOCK_QUOTE,
        ElementType.HEADING_ONE,
        ElementType.HEADING_TWO,
    ],
});
