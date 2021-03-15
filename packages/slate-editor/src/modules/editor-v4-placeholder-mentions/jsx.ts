/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { PLACEHOLDER_MENTION_TYPE } from './constants';
import { Placeholder } from './types';

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
        'h-p': { type: PARAGRAPH_TYPE },
        'h-placeholder-mention': { type: PLACEHOLDER_MENTION_TYPE },
    },
});

export default jsx;
