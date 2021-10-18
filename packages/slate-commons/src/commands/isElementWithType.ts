import { Descendant } from 'slate';

interface ElementWithType extends Record<string, unknown> {
    children: Descendant[];
    type: string;
}

/**
 * @prezly/slate-commons package assumes all Element instances will have a "type: string" attribute
 */
const isElementWithType = (value: any): value is ElementWithType => {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof value.type === 'string' &&
        value.type.length > 0 &&
        Array.isArray(value.children) &&
        value.children.length > 0
    );
};

export default isElementWithType;
