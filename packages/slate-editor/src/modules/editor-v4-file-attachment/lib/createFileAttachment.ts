import { ATTACHMENT_NODE_TYPE, AttachmentNode } from '@prezly/slate-types';
import { UploadcareStoragePayload } from '@prezly/uploadcare';

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
