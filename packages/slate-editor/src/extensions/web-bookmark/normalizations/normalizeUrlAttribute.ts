import { BookmarkNode, normalizeUrl } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

export function normalizeUrlAttribute(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!BookmarkNode.isBookmarkNode(node)) {
        return false;
    }

    if (isEqual(node.url, normalizeUrl(node.url))) {
        return false;
    }

    editor.setNodes<BookmarkNode>({ url: normalizeUrl(node.url) }, { at: path });
    return true;
}
