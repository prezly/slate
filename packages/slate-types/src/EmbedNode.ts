import ElementNode, { isElementNode } from './ElementNode';
import { isOEmbedInfo, OEmbedInfo } from './sdk';

export const EMBED_NODE_TYPE = 'embed';

export default interface EmbedNode {
    oembed: OEmbedInfo;
    type: typeof EMBED_NODE_TYPE;
    url: string;
    uuid: string;
}

export const isEmbedNode = (value: any): value is ElementNode => {
    return (
        isElementNode(value) &&
        value.type === EMBED_NODE_TYPE &&
        isOEmbedInfo(value.oembed) &&
        typeof value.url === 'string' &&
        value.url.length > 0 &&
        typeof value.uuid === 'string' &&
        value.uuid.length > 0
    );
};
