import { EditorCommands } from '@prezly/slate-commons';
import type { BookmarkNode } from '@prezly/slate-types';
import { isBookmarkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeWebBookmark(editor: Editor): BookmarkNode | null {
    return EditorCommands.removeNode<BookmarkNode>(editor, {
        match: isBookmarkNode,
    });
}
