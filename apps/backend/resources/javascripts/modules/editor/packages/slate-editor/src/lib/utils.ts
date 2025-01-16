export function isEmptyText(text: string | null | undefined): boolean {
    return !(text && text.replace(/\s+/g, ''));
}
