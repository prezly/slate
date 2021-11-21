import type { OEmbedInfo } from '@prezly/sdk';

export const isOEmbedInfo = (value: any): value is OEmbedInfo => {
    return (
        typeof value === 'object' &&
        value !== null &&
        ['video', 'photo', 'rich', 'link'].includes(value.type) &&
        typeof value.url === 'string' &&
        value.url.length > 0 &&
        typeof value.version === 'string' &&
        value.version.length > 0
    );
};
