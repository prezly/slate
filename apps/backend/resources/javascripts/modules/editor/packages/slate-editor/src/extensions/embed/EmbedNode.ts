import type { OEmbedInfo } from '@prezly/sdk';
import { isElementNode, type ElementNode } from '@prezly/slate-types';

export interface EmbedNode extends ElementNode {
    type: typeof EmbedNode.TYPE;
    oembed: OEmbedInfo;
    url: string;
    uuid: string;
    layout: `${EmbedNode.Layout}`;
}

export namespace EmbedNode {
    export const TYPE = 'embed';

    export enum Layout {
        CONTAINED = 'contained',
        EXPANDED = 'expanded',
        FULL_WIDTH = 'full-width',
    }

    export function isEmbedNode(value: any): value is EmbedNode {
        return isElementNode<ElementNode>(value, TYPE);
    }
}
