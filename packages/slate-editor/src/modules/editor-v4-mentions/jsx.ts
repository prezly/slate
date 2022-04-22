/* eslint-disable @typescript-eslint/no-namespace */

import type { PlaceholderNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

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

export const jsx = createHyperscript({
    elements: {
        'h-placeholder-mention': { type: PLACEHOLDER_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
    creators: {
        'h-text': createText,
    },
});
