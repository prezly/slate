/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import { PARAGRAPH_NODE_TYPE, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';

import type { Placeholder } from './types';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-p': {
                children?: ReactNode;
            };
            'h-placeholder-mention': {
                children?: ReactNode;
                key: Placeholder['key'];
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-placeholder-mention': { type: PLACEHOLDER_NODE_TYPE },
    },
});

export default jsx;
