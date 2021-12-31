import type { OEmbedInfo } from '@prezly/sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const EMBED_NODE_TYPE = 'embed';

export interface EmbedNode extends ElementNode {
    type: typeof EMBED_NODE_TYPE;
    oembed: OEmbedInfo;
    url: string;
    uuid: string;
}

export function isEmbedNode(value: any): value is EmbedNode {
    return isElementNode<ElementNode>(value, EMBED_NODE_TYPE);
}
