import { Element } from 'slate';

import { UploadcareStoragePayload } from '../sdk';

import ElementNode from './ElementNode';

export const ATTACHMENT_NODE_TYPE = 'attachment';

export default interface AttachmentNode extends ElementNode {
    type: typeof ATTACHMENT_NODE_TYPE;
    description: string;
    file: UploadcareStoragePayload;
}

export const isAttachmentNode = (value: any): value is AttachmentNode =>
    Element.isElementType(value, ATTACHMENT_NODE_TYPE);
