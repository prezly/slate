import { isObject } from '../lib';

export default interface TextNode {
    bold?: boolean;
    italic?: boolean;
    subscript?: boolean;
    superscript?: boolean;
    text: string;
    underlined?: boolean;
}

export const isTextNode = (value: any): value is TextNode => {
    return isObject(value) && typeof value.text === 'string';
};
