import type { OEmbedInfo } from '@prezly/sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const BOOKMARK_NODE_TYPE = 'bookmark';

export enum BookmarkCardLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface BookmarkNode extends ElementNode {
    type: typeof BOOKMARK_NODE_TYPE;
    uuid: string;
    href: string;
    oembed: OEmbedInfo;
    show_thumbnail: boolean;
    layout: BookmarkCardLayout;
    new_tab: boolean;
}

export function isBookmarkNode(value: any): value is BookmarkNode {
    return isElementNode<ElementNode>(value, BOOKMARK_NODE_TYPE);
}

