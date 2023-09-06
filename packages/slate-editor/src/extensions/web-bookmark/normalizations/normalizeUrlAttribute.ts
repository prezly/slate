import { BookmarkNode, normalizeUrl } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import type { Editor, NodeEntry } from 'slate';
import { Transforms } from 'slate';

export function normalizeUrlAttribute(editor: Editor, [node, path]: NodeEntry): boolean {
    if (!BookmarkNode.isBookmarkNode(node)) {
        return false;
    }

    if (isEqual(node.url, normalizeUrl(node.url))) {
        return false;
    }

    Transforms.setNodes<BookmarkNode>(editor, { url: normalizeUrl(node.url) }, { at: path });
    return true;
}
