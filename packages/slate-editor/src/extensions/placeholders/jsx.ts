/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

import { PlaceholderNode } from './PlaceholderNode';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name: string]: {
                children?: ReactNode;
                [prop: string]: any;
            };
        }
    }
}

export const jsx = createHyperscript({
    elements: {
        'h:paragraph': { type: PARAGRAPH_NODE_TYPE },
        'h:attachment-placeholder': { type: PlaceholderNode.Type.ATTACHMENT },
    },
    creators: {
        'h:text': createText,
    },
});
