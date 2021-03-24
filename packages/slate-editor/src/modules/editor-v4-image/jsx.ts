/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { UploadcareStoragePayload } from '@prezly/uploadcare';
import { ReactNode } from 'react';

import { LOADER_TYPE, LoaderElementType } from '../../modules/editor-v4-loader';

import { IMAGE_CANDIDATE_TYPE, IMAGE_TYPE } from './constants';
import { ImageLayout } from './types';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-image': {
                children?: ReactNode;
                file: UploadcareStoragePayload;
                href: string;
                layout: ImageLayout;
                width: string;
                width_factor: string;
            };
            'h-image-candidate': {
                children?: ReactNode;
                href: string;
                src: string;
            };
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
        'h-image': { type: IMAGE_TYPE },
        'h-image-candidate': { type: IMAGE_CANDIDATE_TYPE },
        'h-loader': { type: LOADER_TYPE },
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
