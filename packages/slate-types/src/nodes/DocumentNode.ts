import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const DOCUMENT_NODE_TYPE = 'document';

export interface DocumentNode extends ElementNode {
    type: typeof DOCUMENT_NODE_TYPE;
    version: string;
}

export function isDocumentNode(value: any): value is DocumentNode {
    return isElementNode<DocumentNode>(value, DOCUMENT_NODE_TYPE);
}
