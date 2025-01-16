import { EditorCommands } from '@prezly/slate-commons';
import { BookmarkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

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

export function unsetUnknownAttributes(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!BookmarkNode.isBookmarkNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
