import { Element } from 'slate';

import { UploadcareStoragePayload } from '../sdk';

export const ATTACHMENT_NODE_TYPE = 'attachment';

export default interface AttachmentNode extends Element {
    type: typeof ATTACHMENT_NODE_TYPE;
    description: string;
    file: UploadcareStoragePayload;
}

export const isAttachmentNode = (value: any): value is AttachmentNode =>
    Element.isElementType(value, ATTACHMENT_NODE_TYPE);
