export function decodeSlateFragment(fragment: string): object[] | undefined {
    try {
        const data = JSON.parse(decodeURIComponent(window.atob(fragment)));
        if (Array.isArray(data)) {
            return data;
        }
        if (data !== null && typeof data === 'object') {
            return [data];
        }
        return undefined;
    } catch {
        return undefined;
    }
}
