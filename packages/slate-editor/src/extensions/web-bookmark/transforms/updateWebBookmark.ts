import { BookmarkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateWebBookmark(
    editor: Editor,
    properties: Partial<Pick<BookmarkNode, 'layout' | 'new_tab' | 'show_thumbnail'>>,
): void {
    Transforms.setNodes<BookmarkNode>(editor, properties, { match: BookmarkNode.isBookmarkNode });
}
