import { EditorCommands } from '@prezly/slate-commons';
import { type BookmarkNode, normalizeUrl } from '@prezly/slate-types';
import { isBookmarkNode } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import type { Editor, NodeEntry } from 'slate';
import { Transforms } from 'slate';

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

export function normalizeUrlAttribute(editor: Editor, [node, path]: NodeEntry): boolean {
    if (!isBookmarkNode(node)) {
        return false;
    }

    if (isEqual(node.url, normalizeUrl(node.url))) {
        return false;
    }

    Transforms.setNodes<BookmarkNode>(editor, { url: normalizeUrl(node.url) }, { at: path });
    return true;
}
