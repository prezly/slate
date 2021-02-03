/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { PARAGRAPH_TYPE } from './constants';
import { INLINE_ELEMENT, INLINE_VOID_ELEMENT, VOID_ELEMENT } from './test-utils';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-inline-element': {
                children?: ReactNode;
            };
            'h-inline-void-element': {
                children?: ReactNode;
            };
            'h-void-element': {
                children?: ReactNode;
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-inline-element': { type: INLINE_ELEMENT },
        'h-inline-void-element': { type: INLINE_VOID_ELEMENT },
        'h-void-element': { type: VOID_ELEMENT },
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
