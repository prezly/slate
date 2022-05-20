import { EditorCommands } from '@prezly/slate-commons';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import { isStoryBookmarkNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const shape: Record<keyof StoryBookmarkNode, true> = {
    type: true,
    story: true,
    children: true,
    layout: true,
    new_tab: true,
    show_thumbnail: true,
    uuid: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantStoryBookmarkAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isStoryBookmarkNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
