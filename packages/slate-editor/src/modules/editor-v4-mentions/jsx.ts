/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { PlaceholderNode, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import { ReactNode } from 'react';

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
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
