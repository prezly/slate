/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { ElementType } from './types';

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

const jsx = createHyperscript({
    elements: {
        'h-a': { type: ElementType.LINK },
        'h-blockquote': { type: ElementType.BLOCK_QUOTE },
        'h-h1': { type: ElementType.HEADING_ONE },
        'h-h2': { type: ElementType.HEADING_TWO },
        'h-li': { type: ElementType.LIST_ITEM },
        'h-li-text': { type: ElementType.LIST_ITEM_TEXT },
        'h-ol': { type: ElementType.NUMBERED_LIST },
        'h-p': { type: PARAGRAPH_TYPE },
        'h-ul': { type: ElementType.BULLETED_LIST },
    },
});

export default jsx;
