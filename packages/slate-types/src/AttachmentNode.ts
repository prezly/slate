import ElementNode, { isElementNode } from './ElementNode';
import { UploadcareStoragePayload, isPrezlyStoragePayload } from './sdk';

export const ATTACHMENT_NODE_TYPE = 'attachment';

export default interface AttachmentNode extends ElementNode {
    description: string;
    file: UploadcareStoragePayload;
    type: typeof ATTACHMENT_NODE_TYPE;
}

export const isFileAttachmentNode = (value: any): value is AttachmentNode => {
    return (
        isElementNode(value) &&
        value.type === ATTACHMENT_NODE_TYPE &&
        typeof value.description === 'string' &&
        isPrezlyStoragePayload(value.file)
    );
};
