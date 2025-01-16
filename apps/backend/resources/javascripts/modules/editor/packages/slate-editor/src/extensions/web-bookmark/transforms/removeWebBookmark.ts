import { EditorCommands } from '@prezly/slate-commons';
import { BookmarkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function removeWebBookmark(editor: SlateEditor): BookmarkNode | null {
    return EditorCommands.removeNode<BookmarkNode>(editor, {
        match: BookmarkNode.isBookmarkNode,
    });
}
