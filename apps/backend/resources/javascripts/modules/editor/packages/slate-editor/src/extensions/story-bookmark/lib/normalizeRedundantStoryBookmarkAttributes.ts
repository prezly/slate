import { EditorCommands } from '@prezly/slate-commons';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import { isStoryBookmarkNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

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
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isStoryBookmarkNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
