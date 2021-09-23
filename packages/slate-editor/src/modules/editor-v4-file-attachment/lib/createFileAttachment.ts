import { AttachmentNode } from '@prezly/slate-types';
import { UploadcareStoragePayload } from '@prezly/uploadcare';

import { FILE_ATTACHMENT_TYPE } from '../constants';

const createFileAttachment = (
    file: UploadcareStoragePayload,
    description = '',
): AttachmentNode => ({
    children: [{ text: '' }],
    description,
    file,
    type: FILE_ATTACHMENT_TYPE,
});

export default createFileAttachment;
