/* eslint-disable @typescript-eslint/no-namespace */

import type { WithOverrides } from '@prezly/slate-commons';
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
import type { ReactNode } from 'react';
import { createEditor as createSlateEditor } from 'slate';
import {
    createEditor as createEditorFactory,
    createHyperscript,
    createText,
} from 'slate-hyperscript';

import { BlockquoteExtension } from '#extensions/blockquote';
import { HeadingExtension } from '#extensions/heading';
import { InlineLinksExtension } from '#extensions/inline-links';
import { ListExtension } from '#extensions/list';
import { createEditor } from '#modules/editor';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            editor: {
                children?: ReactNode;
                plugins?: WithOverrides[];
            };
        }
    }
}

const extensions = [
    BlockquoteExtension(),
    HeadingExtension(),
    InlineLinksExtension(),
    ListExtension(),
];

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
        editor: createEditorFactory(() => createEditor(createSlateEditor(), () => extensions)),
        'h-text': createText,
    },
});
