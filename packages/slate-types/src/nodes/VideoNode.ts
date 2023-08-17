import type { OEmbedInfo } from '@prezly/sdk';

import { isOEmbedInfo } from '../sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import { isNonEmptyString, isObject, isUuid } from './validation';

export interface VideoNode extends ElementNode {
    type: typeof VideoNode.TYPE;
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
}

export namespace VideoNode {
    export const TYPE = 'video';

    export function isVideoNode(value: any): value is VideoNode {
        return isElementNode<ElementNode>(value, TYPE);
    }

    export function validateVideoNode(node: Partial<VideoNode> | undefined): node is VideoNode {
        return (
            isObject(node) &&
            node.type === TYPE &&
            isUuid(node.uuid) &&
            isNonEmptyString(node.url) &&
            isOEmbedInfo(node.oembed)
        );
    }
}
