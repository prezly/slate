import type { Element } from '@udecode/plate';

import { isObject } from './validation';

export interface ElementNode extends Element {
    type: string;
}

/**
 * Check if the value is having an `ElementNode` shape: `{ children: array, type: string }`.
 */
export function isElementNode(value: unknown): value is ElementNode;

/**
 * Check if the value is an `ElementNode` of the given type.
 */
export function isElementNode<T extends ElementNode>(value: unknown, type: T['type']): value is T;

/**
 * Check if the value is an `ElementNode` of one of the given types.
 */
export function isElementNode<T extends ElementNode>(value: unknown, type: T['type'][]): value is T;

export function isElementNode(value: unknown, type?: string | string[]): boolean {
    return (
        isObject(value) &&
        Array.isArray(value.children) &&
        typeof value.type === 'string' &&
        (type === undefined || isElementType(value.type, type))
    );
}

function isElementType(elementType: string, checkType: string | string[]): boolean {
    return (
        (typeof checkType === 'string' && elementType === checkType) ||
        (Array.isArray(checkType) && checkType.includes(elementType))
    );
}
