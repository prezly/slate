import { BaseElement, Element } from 'slate';

export default interface ElementNode extends BaseElement {
    type: string;
}

export function isElementNode(value: any): value is Element & ElementNode {
    return Element.isElement(value)
        && typeof (value as any).type === 'string';
}
