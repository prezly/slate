import { EditorCommands } from '@prezly/slate-commons';
import type { BookmarkNode } from '@prezly/slate-types';
import { isBookmarkNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const shape: Record<keyof BookmarkNode, true> = {
    type: true,
    uuid: true,
    url: true,
    oembed: true,
    layout: true,
    children: true,
    show_thumbnail: true,
    new_tab: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantWebBookmarkAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isBookmarkNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
