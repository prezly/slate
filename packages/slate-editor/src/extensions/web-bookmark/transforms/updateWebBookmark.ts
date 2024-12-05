import { BookmarkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function updateWebBookmark(
    editor: SlateEditor,
    properties: Partial<Pick<BookmarkNode, 'layout' | 'new_tab' | 'show_thumbnail'>>,
): void {
    editor.setNodes<BookmarkNode>(properties, { match: BookmarkNode.isBookmarkNode });
}
