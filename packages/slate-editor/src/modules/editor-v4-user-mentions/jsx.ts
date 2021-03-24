/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { USER_MENTION_TYPE } from './constants';
import { User } from './types';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-p': {
                children?: ReactNode;
            };
            'h-user-mention': {
                children?: ReactNode;
                user: User;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-p': { type: PARAGRAPH_TYPE },
        'h-user-mention': { type: USER_MENTION_TYPE },
    },
});

export default jsx;
