/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
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

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-a': {
                children?: ReactNode;
                href: string;
            };
            'h-blockquote': {
                children?: ReactNode;
            };
            'h-h1': {
                children?: ReactNode;
            };
            'h-h2': {
                children?: ReactNode;
            };
            'h-li': {
                children?: ReactNode;
            };
            'h-li-text': {
                children?: ReactNode;
            };
            'h-ol': {
                children?: ReactNode;
            };
            'h-p': {
                children?: ReactNode;
            };
            'h-ul': {
                children?: ReactNode;
            };
        }
    }
}

export const jsx = createHyperscript({
    elements: {
        'h-a': { type: LINK_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-h1': { type: HEADING_1_NODE_TYPE },
        'h-h2': { type: HEADING_2_NODE_TYPE },
        'h-ul': { type: BULLETED_LIST_NODE_TYPE },
        'h-ol': { type: NUMBERED_LIST_NODE_TYPE },
        'h-li': { type: LIST_ITEM_NODE_TYPE },
        'h-li-text': { type: LIST_ITEM_TEXT_NODE_TYPE },
        'h-blockquote': { type: QUOTE_NODE_TYPE },
    },
});
