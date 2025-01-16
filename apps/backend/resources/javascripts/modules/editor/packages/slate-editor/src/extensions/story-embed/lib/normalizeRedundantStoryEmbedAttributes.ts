import { EditorCommands } from '@prezly/slate-commons';
import type { StoryEmbedNode } from '@prezly/slate-types';
import { isStoryEmbedNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

const shape: Record<keyof StoryEmbedNode, true> = {
    type: true,
    story: true,
    appearance: true,
    position: true,
    children: true,
    header_footer: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantStoryEmbedAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isStoryEmbedNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
