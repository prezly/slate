import { UploadcareStoragePayload } from '@prezly/uploadcare';

import { FILE_ATTACHMENT_TYPE } from '../constants';
import { FileAttachmentElementType } from '../types';

const createFileAttachment = (
    file: UploadcareStoragePayload,
    description = '',
): FileAttachmentElementType => ({
    children: [{ text: '' }],
    description,
    file,
    type: FILE_ATTACHMENT_TYPE,
});

export default createFileAttachment;
