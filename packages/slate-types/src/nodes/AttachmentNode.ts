import { UploadcareStoragePayload, isPrezlyStoragePayload } from '../sdk';

import ElementNode, { isElementNode } from './ElementNode';

export const ATTACHMENT_NODE_TYPE = 'attachment';

export default interface AttachmentNode extends ElementNode<typeof ATTACHMENT_NODE_TYPE> {
    description: string;
    file: UploadcareStoragePayload;
}

export const isAttachmentNode = (value: any): value is AttachmentNode => {
    return (
        isElementNode(value) &&
        value.type === ATTACHMENT_NODE_TYPE &&
        typeof value.description === 'string' &&
        isPrezlyStoragePayload(value.file)
    );
};
