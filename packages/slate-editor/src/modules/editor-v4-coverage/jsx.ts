/* eslint-disable @typescript-eslint/no-namespace */

import type { Coverage } from '@prezly/sdk';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { COVERAGE_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-coverage': {
                children?: ReactNode;
                coverage: {
                    id: Coverage['id'];
                };
                uuid: string;
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

export const jsx = createHyperscript({
    elements: {
        'h-coverage': { type: COVERAGE_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
});
