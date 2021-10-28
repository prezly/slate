import { Element } from 'slate';

export const PARAGRAPH_NODE_TYPE = 'paragraph';

export default interface ParagraphNode extends Element {
    type: typeof PARAGRAPH_NODE_TYPE;
}

export const isParagraphNode = (value: any): value is ParagraphNode =>
    Element.isElementType(value, PARAGRAPH_NODE_TYPE);
