/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { UploadcareStoragePayload } from '@prezly/uploadcare';
import { ReactNode } from 'react';

import { FILE_ATTACHMENT_TYPE } from './constants';

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
        'h-file-attachment': { type: FILE_ATTACHMENT_TYPE },
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
