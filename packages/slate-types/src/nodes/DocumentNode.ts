import { ElementNode, isElementNode } from './ElementNode';

export const DOCUMENT_NODE_TYPE = 'document';

export interface DocumentNode extends ElementNode {
    type: typeof DOCUMENT_NODE_TYPE;
    version: string;
}

export const isDocumentNode = (value: any): value is DocumentNode =>
    isElementNode<DocumentNode>(value, DOCUMENT_NODE_TYPE);
