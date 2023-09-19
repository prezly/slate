/* eslint-disable @typescript-eslint/no-namespace */

import type { ImageLayout } from '@prezly/slate-types';
import { IMAGE_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { UploadedFile } from '@prezly/uploadcare';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

import type { LoaderNode } from '#extensions/loader';
import { LOADER_NODE_TYPE } from '#extensions/loader';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-image': {
                children?: ReactNode;
                file: UploadedFile;
                href: string;
                layout: ImageLayout;
                width: string;
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

export const hyperscript = createHyperscript({
    elements: {
        'h-image': { type: IMAGE_NODE_TYPE },
        'h-loader': { type: LOADER_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
    creators: {
        'h-text': createText,
    },
});
