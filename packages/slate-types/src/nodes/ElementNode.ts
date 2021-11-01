import type { BaseElement, Element } from 'slate';

export default interface ElementNode extends BaseElement {
    type: string;
}

export function isElementNode(element: Element): element is ElementNode {
    return typeof element.type === 'string';
}
