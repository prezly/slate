/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { ReactNode } from 'react';

import { LOADER_TYPE } from './constants';
import { LoaderNode } from './types';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-loader': {
                children?: ReactNode;
                contentType: LoaderNode['contentType'];
                id: LoaderNode['id'];
                message: LoaderNode['message'];
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-loader': { type: LOADER_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
});

export default jsx;
