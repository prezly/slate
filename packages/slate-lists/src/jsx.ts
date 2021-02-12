/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { ElementType } from './test-utils';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-element-with-no-type': {
                children?: ReactNode;
            };
            'h-inline-element': {
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
            'h-unwrappable-element': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-element-with-no-type': {},
        'h-inline-element': { type: ElementType.INLINE_ELEMENT },
        'h-li': { type: ElementType.LIST_ITEM },
        'h-li-text': { type: ElementType.LIST_ITEM_TEXT },
        'h-ol': { type: ElementType.NUMBERED_LIST },
        'h-p': { type: PARAGRAPH_TYPE },
        'h-ul': { type: ElementType.BULLETED_LIST },
        'h-unwrappable-element': { type: ElementType.UNWRAPPABLE_ELEMENT },
    },
});

export default jsx;
