export function normalizeUrl(url: string): string {
    if (!url || url.includes('://')) {
        return url;
    }

    if (url.startsWith('//')) {
        return `http:${url}`;
    }

    return `http://${url}`;
}
