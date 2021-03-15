import { OEmbedInfo, OEmbedInfoType } from 'types';

const isOEmbedInfo = (oembed: any): oembed is OEmbedInfo =>
    typeof oembed === 'object' &&
    oembed !== null &&
    Object.values(OEmbedInfoType).includes(oembed.type) &&
    typeof oembed.url === 'string' &&
    oembed.url.length > 0 &&
    typeof oembed.version === 'string' &&
    oembed.version.length > 0;

export default isOEmbedInfo;
