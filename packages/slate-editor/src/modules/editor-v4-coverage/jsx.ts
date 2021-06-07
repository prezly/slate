/* eslint-disable @typescript-eslint/no-namespace */

import { Coverage } from '@prezly/sdk';
import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { COVERAGE_TYPE } from './constants';

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

const jsx = createHyperscript({
    elements: {
        'h-coverage': { type: COVERAGE_TYPE },
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
