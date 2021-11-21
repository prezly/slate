import type { UploadcareStoragePayload } from '../sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const ATTACHMENT_NODE_TYPE = 'attachment';

export interface AttachmentNode extends ElementNode {
    type: typeof ATTACHMENT_NODE_TYPE;
    description: string;
    file: UploadcareStoragePayload;
}

export const isAttachmentNode = (value: any): value is AttachmentNode =>
    isElementNode<AttachmentNode>(value, ATTACHMENT_NODE_TYPE);
