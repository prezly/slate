import { EditorCommands } from '@prezly/slate-commons';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import { isStoryBookmarkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeStoryBookmark(editor: Editor): StoryBookmarkNode | null {
    return EditorCommands.removeNode<StoryBookmarkNode>(editor, {
        match: isStoryBookmarkNode,
    });
}
