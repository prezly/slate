/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import type { ImageLayout } from '@prezly/slate-types';
import { IMAGE_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { UploadcareStoragePayload } from '@prezly/uploadcare';
import type { ReactNode } from 'react';

import type { LoaderNode } from '#modules/editor-v4-loader';
import { LOADER_TYPE } from '#modules/editor-v4-loader';

import { IMAGE_CANDIDATE_TYPE } from './constants';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-image': {
                children?: ReactNode;
                file: UploadcareStoragePayload;
                href: string;
                layout: ImageLayout;
                width: string;
            };
            'h-image-candidate': {
                children?: ReactNode;
                href: string;
                src: string;
            };
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

export const jsx = createHyperscript({
    elements: {
        'h-image': { type: IMAGE_NODE_TYPE },
        'h-image-candidate': { type: IMAGE_CANDIDATE_TYPE },
        'h-loader': { type: LOADER_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
});
