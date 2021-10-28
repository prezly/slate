import BlockNode from './BlockNode';
import ElementNode, { isElementNode } from './ElementNode';

export const DOCUMENT_NODE_TYPE = 'document';

export default interface DocumentNode extends Omit<ElementNode, 'children'> {
    children: BlockNode[];
    type: typeof DOCUMENT_NODE_TYPE;
    version: string;
}

export const isDocumentNode = (value: any): value is DocumentNode => {
    return (
        isElementNode(value) &&
        value.type === DOCUMENT_NODE_TYPE &&
        typeof value.version === 'string'
    );
};
