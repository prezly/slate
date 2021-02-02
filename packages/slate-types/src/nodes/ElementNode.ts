import { isObject } from '../lib';

import TextNode, { isTextNode } from './TextNode';

export default interface ElementNode<T extends string = string> extends Record<string, unknown> {
    children: (ElementNode<string> | TextNode)[];
    type: T;
}

export const isElementNode = (value: any): value is ElementNode => {
    return (
        isObject(value) &&
        typeof value.type === 'string' &&
        value.type.length > 0 &&
        Array.isArray(value.children) &&
        value.children.length > 0 &&
        value.children.every((child) => isTextNode(child) || isElementNode(child))
    );
};
