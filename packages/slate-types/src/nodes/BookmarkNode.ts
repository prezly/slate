import type { OEmbedInfo } from '@prezly/sdk';

import { isOEmbedInfo } from '../sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import { isBoolean, isEnum, isNonEmptyString, isObject, isUuid } from './validation';

export const BOOKMARK_NODE_TYPE = 'bookmark';

export enum BookmarkCardLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface BookmarkNode extends ElementNode {
    type: typeof BOOKMARK_NODE_TYPE;
    uuid: string;
    url: string;
    oembed: OEmbedInfo;
    show_thumbnail: boolean;
    layout: BookmarkCardLayout;
    new_tab: boolean;
}

export namespace BookmarkNode {
    export enum Presentation {
        BOOKMARK = 'bookmark',
        EMBED = 'embed',
    }
}

export function isBookmarkNode(value: any): value is BookmarkNode {
    return isElementNode<ElementNode>(value, BOOKMARK_NODE_TYPE);
}

export function validateBookmarkNode(
    node: Partial<BookmarkNode> | undefined,
): node is BookmarkNode {
    return (
        isObject(node) &&
        node.type === BOOKMARK_NODE_TYPE &&
        isUuid(node.uuid) &&
        isNonEmptyString(node.url) &&
        isOEmbedInfo(node.oembed) &&
        isBoolean(node.show_thumbnail) &&
        isBoolean(node.new_tab) &&
        isEnum(node.layout, BookmarkCardLayout)
    );
}
