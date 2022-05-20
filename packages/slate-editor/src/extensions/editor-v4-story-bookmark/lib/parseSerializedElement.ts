import type { StoryBookmarkNode } from '@prezly/slate-types';
import { validateStoryBookmarkNode } from '@prezly/slate-types';

import { createStoryBookmark } from './createStoryBookmark';

export function parseSerializedElement(serialized: string): StoryBookmarkNode | undefined {
    const parsed = JSON.parse(serialized);

    if (validateStoryBookmarkNode(parsed)) {
        return createStoryBookmark(parsed);
    }

    return undefined;
}
