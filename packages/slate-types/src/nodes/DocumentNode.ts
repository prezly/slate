import { Element } from 'slate';

export const DOCUMENT_NODE_TYPE = 'document';

export default interface DocumentNode extends Element {
    type: typeof DOCUMENT_NODE_TYPE;
    version: string;
}

export const isDocumentNode = (value: any): value is DocumentNode =>
    Element.isElementType(value, DOCUMENT_NODE_TYPE);
