/* eslint-disable @typescript-eslint/no-namespace */

import {
    BULLETED_LIST_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    LINK_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import { createEditor as makeEditor } from 'slate';
import { createEditor, createHyperscript } from 'slate-hyperscript';

import { createEditorV4 } from '#modules/editor-v4';
import { InlineLinksExtension } from '#modules/editor-v4-inline-links';
import { RichFormattingExtension } from '#modules/editor-v4-rich-formatting';

declare global {
    namespace JSX {
        interface IntrinsicElements {}
    }
}

const extensions = [InlineLinksExtension(), RichFormattingExtension({ blocks: true })];

export const jsx = createHyperscript({
    elements: {
        paragraph: { type: PARAGRAPH_NODE_TYPE },
        link: { type: LINK_NODE_TYPE },
        blockquote: { type: QUOTE_NODE_TYPE },
        h1: { type: HEADING_1_NODE_TYPE },
        h2: { type: HEADING_2_NODE_TYPE },
        ol: { type: NUMBERED_LIST_NODE_TYPE },
        ul: { type: BULLETED_LIST_NODE_TYPE },
        li: { type: LIST_ITEM_NODE_TYPE },
        'li-text': { type: LIST_ITEM_TEXT_NODE_TYPE },
    },
    creators: {
        editor: createEditor(() => createEditorV4(makeEditor(), () => extensions)),
    },
});
