/* eslint-disable @typescript-eslint/no-namespace */

import {
    BULLETED_LIST_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
} from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-divider': {
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

export const hyperscript = createHyperscript({
    elements: {
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-divider': { type: DIVIDER_NODE_TYPE },
        'h-ol': { type: NUMBERED_LIST_NODE_TYPE },
        'h-ul': { type: BULLETED_LIST_NODE_TYPE },
        'h-li': { type: LIST_ITEM_NODE_TYPE },
        'h-li-text': { type: LIST_ITEM_TEXT_NODE_TYPE },
    },
    creators: {
        'h-text': createText,
    },
});
