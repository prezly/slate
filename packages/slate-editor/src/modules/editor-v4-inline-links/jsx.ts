/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import { LINK_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-a': {
                children?: ReactNode;
                href: string;
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

export const jsx = createHyperscript({
    elements: {
        'h-a': { type: LINK_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
});
