import { BookmarkNode } from '@prezly/slate-types';

import { createWebBookmark } from './createWebBookmark';

export function parseSerializedElement(serialized: string): BookmarkNode | undefined {
    const parsed = JSON.parse(serialized);

    if (BookmarkNode.validateBookmarkNode(parsed)) {
        return createWebBookmark(parsed);
    }

    return undefined;
}
