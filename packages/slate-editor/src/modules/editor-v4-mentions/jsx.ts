/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import type { PlaceholderNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-placeholder-mention': {
                children?: ReactNode;
                key: PlaceholderNode['key'];
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-placeholder-mention': { type: PLACEHOLDER_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
});

export default jsx;
