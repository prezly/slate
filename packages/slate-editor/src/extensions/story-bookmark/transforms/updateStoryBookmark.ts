import type { StoryBookmarkNode } from '@prezly/slate-types';
import { isStoryBookmarkNode } from '@prezly/slate-types';
import { pick } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';

export function updateStoryBookmark(
    editor: SlateEditor,
    attrs: Partial<Pick<StoryBookmarkNode, 'show_thumbnail' | 'layout' | 'new_tab'>>,
) {
    const changes = pick(attrs, ['show_thumbnail', 'layout', 'new_tab']);

    editor.setNodes<StoryBookmarkNode>(changes, {
        match: isStoryBookmarkNode,
    });
}
