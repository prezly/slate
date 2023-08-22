import type { OEmbedInfo } from '@prezly/sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export interface EmbedNode extends ElementNode {
    type: typeof EmbedNode.TYPE;
    oembed: OEmbedInfo;
    url: string;
    uuid: string;
}

export namespace EmbedNode {
    export const TYPE = 'embed';

    export function isEmbedNode(value: any): value is EmbedNode {
        return isElementNode<ElementNode>(value, TYPE);
    }
}
