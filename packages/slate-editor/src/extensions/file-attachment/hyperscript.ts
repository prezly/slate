/* eslint-disable @typescript-eslint/no-namespace */

import { ATTACHMENT_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { UploadedFile } from '@prezly/uploadcare';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-file-attachment': {
                children?: ReactNode;
                description: string;
                file: UploadedFile;
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

export const hyperscript = createHyperscript({
    elements: {
        'h-file-attachment': { type: ATTACHMENT_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
    creators: {
        'h-text': createText,
    },
});
