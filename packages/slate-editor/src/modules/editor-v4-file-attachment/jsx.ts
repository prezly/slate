/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import { ATTACHMENT_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { UploadcareStoragePayload } from '@prezly/uploadcare';
import type { ReactNode } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-file-attachment': {
                children?: ReactNode;
                description: string;
                file: UploadcareStoragePayload;
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-file-attachment': { type: ATTACHMENT_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
    },
});

export default jsx;
