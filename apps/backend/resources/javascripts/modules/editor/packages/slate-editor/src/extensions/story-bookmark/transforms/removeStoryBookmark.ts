import { EditorCommands } from '@prezly/slate-commons';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import { isStoryBookmarkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function removeStoryBookmark(editor: SlateEditor): StoryBookmarkNode | null {
    return EditorCommands.removeNode<StoryBookmarkNode>(editor, {
        match: isStoryBookmarkNode,
    });
}
