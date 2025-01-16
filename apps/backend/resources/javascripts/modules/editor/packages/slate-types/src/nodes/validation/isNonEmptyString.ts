export function isNonEmptyString(value: unknown): boolean {
    return typeof value === 'string' && value.length > 0;
}
