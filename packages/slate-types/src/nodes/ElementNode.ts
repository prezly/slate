import { isObject } from '../lib';

import TextNode from './TextNode';

export default interface ElementNode<T extends string = string> extends Record<string, unknown> {
    children: (ElementNode<string> | TextNode)[];
    type: T;
}

export const isElementNode = (value: any): value is ElementNode => {
    return isObject(value) && typeof value.type === 'string' && value.type.length > 0;
};
