import type { BaseElement } from 'slate';

import { isObject } from '../lib';

export default interface ElementNode extends BaseElement {
    type: string;
}

export function isElementNode(element: unknown): element is ElementNode {
    return isObject(element) && Array.isArray(element.children) && typeof element.type === 'string';
}
