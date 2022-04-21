import type { Extension } from '@prezly/slate-commons';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { RichTextElement, Text } from './components';
import { RICH_FORMATTING_EXTENSION_ID } from './constants';
import { createDeserialize } from './createDeserialize';
import { createOnKeyDownHandler } from './createOnKeyDownHandler';
import {
    isRichTextElement,
    normalizeRedundantRichTextAttributes,
    withResetRichFormattingOnBreak,
} from './lib';
import { ElementType } from './types';
import { withListsFormatting } from './withListsFormatting';

interface Parameters {
    blocks: boolean;
}

export const RichFormattingExtension = ({ blocks }: Parameters): Extension => ({
    id: RICH_FORMATTING_EXTENSION_ID,
    deserialize: createDeserialize({ blocks }),
    inlineTypes: [],
    normalizers: [normalizeRedundantRichTextAttributes],
    onKeyDown: createOnKeyDownHandler({ blocks }),
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (blocks && isRichTextElement(element)) {
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
    withOverrides(editor) {
        return withResetRichFormattingOnBreak(blocks ? withListsFormatting(editor) : editor);
    },
});
