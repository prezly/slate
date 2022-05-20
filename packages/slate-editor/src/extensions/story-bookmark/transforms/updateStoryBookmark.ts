import type { StoryBookmarkNode } from '@prezly/slate-types';
import { isStoryBookmarkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { pick } from '#lodash';

export function updateStoryBookmark(
    editor: Editor,
    attrs: Partial<Pick<StoryBookmarkNode, 'show_thumbnail' | 'layout' | 'new_tab'>>,
) {
    const changes = pick(attrs, ['show_thumbnail', 'layout', 'new_tab']);

    Transforms.setNodes<StoryBookmarkNode>(editor, changes, {
        match: isStoryBookmarkNode,
    });
}
