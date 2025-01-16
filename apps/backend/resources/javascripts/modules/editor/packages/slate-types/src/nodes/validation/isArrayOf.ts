export function isArrayOf<T = unknown>(
    value: unknown,
    predicate: (item: T) => boolean,
): value is T[] {
    return Array.isArray(value) && value.every(predicate);
}
