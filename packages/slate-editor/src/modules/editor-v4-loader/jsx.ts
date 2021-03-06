/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { LOADER_TYPE } from './constants';
import { LoaderElementType } from './types';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-loader': {
                children?: ReactNode;
                contentType: LoaderElementType['contentType'];
                id: LoaderElementType['id'];
                message: LoaderElementType['message'];
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
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
