import type { UploadedFile } from '@prezly/uploads';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const ATTACHMENT_NODE_TYPE = 'attachment';

export interface AttachmentNode extends ElementNode {
    type: typeof ATTACHMENT_NODE_TYPE;
    description: string;
    file: UploadedFile;
}

export function isAttachmentNode(value: any): value is AttachmentNode {
    return isElementNode<AttachmentNode>(value, ATTACHMENT_NODE_TYPE);
}
