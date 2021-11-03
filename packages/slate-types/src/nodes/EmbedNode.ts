import { OEmbedInfo } from '@prezly/sdk';
import { Element } from 'slate';

import ElementNode from './ElementNode';

export const EMBED_NODE_TYPE = 'embed';

export default interface EmbedNode extends ElementNode {
    type: typeof EMBED_NODE_TYPE;
    oembed: OEmbedInfo;
    url: string;
    uuid: string;
}

export const isEmbedNode = (value: any): value is EmbedNode =>
    Element.isElementType(value, EMBED_NODE_TYPE);
