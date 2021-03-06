/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { DIVIDER_TYPE } from './constants';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-divider': {
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
        'h-divider': { type: DIVIDER_TYPE },
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
