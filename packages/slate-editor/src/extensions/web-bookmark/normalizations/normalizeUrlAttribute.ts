import { BookmarkNode, normalizeUrl } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

export function normalizeUrlAttribute(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!BookmarkNode.isBookmarkNode(node)) {
        return false;
    }

    if (isEqual(node.url, normalizeUrl(node.url))) {
        return false;
    }

    editor.tf.setNodes<BookmarkNode>({ url: normalizeUrl(node.url) }, { at: path });
    return true;
}
