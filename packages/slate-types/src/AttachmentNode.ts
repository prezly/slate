import ElementNode, { isElementNode } from './ElementNode';
import { UploadcareStoragePayload, isPrezlyStoragePayload } from './sdk';

export const ATTACHMENT_NODE_TYPE = 'attachment';

export default interface AttachmentNode extends ElementNode {
    description: string;
    file: UploadcareStoragePayload;
    type: 'attachment';
}

export const isFileAttachmentNode = (node: any): node is AttachmentNode =>
    isElementNode(node) &&
    node.type === ATTACHMENT_NODE_TYPE &&
    typeof node.description === 'string' &&
    isPrezlyStoragePayload(node.file);
