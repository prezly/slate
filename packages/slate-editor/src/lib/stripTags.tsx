import striptags from 'striptags';

export function stripTags(text?: string) {
    if (!text) {
        return '';
    }

    return striptags(text);
}
