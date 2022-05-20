import type { AttachmentNode } from '@prezly/slate-types';
import { ATTACHMENT_NODE_TYPE } from '@prezly/slate-types';
import type { UploadedFile } from '@prezly/uploadcare';

export function createFileAttachment(file: UploadedFile, description = ''): AttachmentNode {
    return {
        children: [{ text: '' }],
        description,
        file,
        type: ATTACHMENT_NODE_TYPE,
    };
}
