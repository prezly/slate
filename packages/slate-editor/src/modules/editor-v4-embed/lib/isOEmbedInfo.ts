import { OEmbedInfo } from '@prezly/sdk';

const isOEmbedInfo = (value: any): value is OEmbedInfo =>
    typeof value === 'object' &&
    value !== null &&
    ['video', 'photo', 'rich', 'link'].includes(value.type) &&
    typeof value.url === 'string' &&
    value.url.length > 0 &&
    typeof value.version === 'string' &&
    value.version.length > 0;

export default isOEmbedInfo;
