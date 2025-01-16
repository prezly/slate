export function isEnum<T extends string>(value: unknown, values: Record<string, T>): value is T {
    return typeof value === 'string' && Object.values(values).includes(value as T);
}
