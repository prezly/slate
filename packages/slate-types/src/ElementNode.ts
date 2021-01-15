import { isObject } from './lib';

export default interface ElementNode extends Record<string, unknown> {
    type: string;
}

export const isElementNode = (value: any): value is ElementNode => {
    return isObject(value) && typeof value.type === 'string' && value.type.length > 0;
};
