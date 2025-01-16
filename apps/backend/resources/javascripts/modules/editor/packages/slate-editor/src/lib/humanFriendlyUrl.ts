const HTTP_OR_HTTPS_PREFIX = /^(http|https):\/\//;
const TRAILING_SLASH = /\/$/;

export function humanFriendlyUrl(url: string): string {
    return url.replace(HTTP_OR_HTTPS_PREFIX, '').replace(TRAILING_SLASH, '');
}
