import { OEmbedInfo } from '@prezly/sdk';
import { Element } from 'slate';

export const EMBED_NODE_TYPE = 'embed';

export default interface EmbedNode extends Element {
    type: typeof EMBED_NODE_TYPE;
    oembed: OEmbedInfo;
    url: string;
    uuid: string;
}

export const isEmbedNode = (value: any): value is EmbedNode =>
    Element.isElementType(value, EMBED_NODE_TYPE);
