/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { Example, EXAMPLE_MENTION_TYPE } from './test-utils';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-example-mention': {
                children?: ReactNode;
                example: Example;
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-example-mention': { type: EXAMPLE_MENTION_TYPE },
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
