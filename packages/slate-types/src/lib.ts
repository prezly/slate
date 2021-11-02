import { isPlainObject } from 'is-plain-object';

declare module 'is-plain-object' {
    function isPlainObject(value: unknown): value is Record<string, unknown>;
}

export function isObject(value: unknown): value is Record<string, unknown> {
    return isPlainObject(value);
}
