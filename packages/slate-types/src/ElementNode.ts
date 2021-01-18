import { isObject } from './lib';
import TextNode from './TextNode';

export default interface ElementNode extends Record<string, unknown> {
    children: (ElementNode | TextNode)[];
    type: string;
}

export const isElementNode = (value: any): value is ElementNode => {
    return isObject(value) && typeof value.type === 'string' && value.type.length > 0;
};
