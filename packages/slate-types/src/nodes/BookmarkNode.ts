import type { OEmbedInfo } from '@prezly/sdk';

import { isOEmbedInfo } from '../sdk';

import { isElementNode, type ElementNode } from './ElementNode';
import { isBoolean, isEnum, isNonEmptyString, isObject, isUuid } from './validation';

export interface BookmarkNode extends ElementNode {
    type: typeof BookmarkNode.TYPE;
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
    show_thumbnail: boolean;
    layout: `${BookmarkNode.Layout}`;
    new_tab: boolean;
}

export namespace BookmarkNode {
    export const TYPE = 'bookmark';

    export enum Layout {
        VERTICAL = 'vertical',
        HORIZONTAL = 'horizontal',
    }

    export function isBookmarkNode(value: any): value is BookmarkNode {
        return isElementNode<ElementNode>(value, TYPE);
    }

    export function validateBookmarkNode(
        node: Partial<BookmarkNode> | undefined,
    ): node is BookmarkNode {
        return (
            isObject(node) &&
            node.type === BookmarkNode.TYPE &&
            isUuid(node.uuid) &&
            isNonEmptyString(node.url) &&
            isOEmbedInfo(node.oembed) &&
            isBoolean(node.show_thumbnail) &&
            isBoolean(node.new_tab) &&
            isEnum(node.layout, BookmarkNode.Layout)
        );
    }
}
