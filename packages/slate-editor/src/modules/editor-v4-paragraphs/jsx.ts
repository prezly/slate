/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
