/* eslint-disable @typescript-eslint/no-namespace */

import { MENTION_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

import type { User } from './types';

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

export const hyperscript = createHyperscript({
    elements: {
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-user-mention': { type: MENTION_NODE_TYPE },
    },
    creators: {
        'h-text': createText,
    },
});
