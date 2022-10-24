/* eslint-disable @typescript-eslint/no-namespace */

import type { CoverageEntry } from '@prezly/sdk';
import { COVERAGE_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-coverage': {
                children?: ReactNode;
                coverage: {
                    id: CoverageEntry['id'];
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
    creators: {
        'h-text': createText,
    },
});
