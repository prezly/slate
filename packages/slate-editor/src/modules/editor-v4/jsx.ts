/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import { DIVIDER_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';

import { ElementType } from '../../modules/editor-v4-rich-formatting';

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

export const jsx = createHyperscript({
    elements: {
        'h-divider': { type: DIVIDER_NODE_TYPE },
        'h-li': { type: ElementType.LIST_ITEM },
        'h-li-text': { type: ElementType.LIST_ITEM_TEXT },
        'h-ol': { type: ElementType.NUMBERED_LIST },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-ul': { type: ElementType.BULLETED_LIST },
    },
});
