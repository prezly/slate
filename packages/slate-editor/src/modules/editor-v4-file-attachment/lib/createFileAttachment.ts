import type { AttachmentNode } from '@prezly/slate-types';
import { ATTACHMENT_NODE_TYPE } from '@prezly/slate-types';
import type { UploadcareStoragePayload } from '@prezly/uploadcare';

const createFileAttachment = (
    file: UploadcareStoragePayload,
    description = '',
): AttachmentNode => ({
    children: [{ text: '' }],
    description,
    file,
    type: ATTACHMENT_NODE_TYPE,
});

export default createFileAttachment;
