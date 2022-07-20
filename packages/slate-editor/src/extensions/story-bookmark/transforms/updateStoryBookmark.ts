import type { StoryBookmarkNode } from '@prezly/slate-types';
import { isStoryBookmarkNode } from '@prezly/slate-types';
import { pick } from 'lodash-es';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateStoryBookmark(
    editor: Editor,
    attrs: Partial<Pick<StoryBookmarkNode, 'show_thumbnail' | 'layout' | 'new_tab'>>,
) {
    const changes = pick(attrs, ['show_thumbnail', 'layout', 'new_tab']);

    Transforms.setNodes<StoryBookmarkNode>(editor, changes, {
        match: isStoryBookmarkNode,
    });
}
