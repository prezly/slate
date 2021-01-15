import { OEmbedInfo } from './sdk';

export default interface EmbedNode {
    oembed: OEmbedInfo;
    type: 'embed';
    url: string;
    uuid: string;
}
