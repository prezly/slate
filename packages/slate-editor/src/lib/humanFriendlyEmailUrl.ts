const MAILTO_PREFIX = /^(mailto):/;

export function humanFriendlyEmailUrl(url: string): string {
    return url.replace(MAILTO_PREFIX, '');
}
