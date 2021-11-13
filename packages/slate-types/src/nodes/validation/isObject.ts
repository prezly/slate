import { isPlainObject } from 'is-plain-object';

export function isObject(value: unknown): value is Record<string, unknown> {
    return isPlainObject(value);
}
