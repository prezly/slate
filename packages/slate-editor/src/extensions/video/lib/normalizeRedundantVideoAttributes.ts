import { EditorCommands } from '@prezly/slate-commons';
import { VideoNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

const shape: Record<keyof VideoNode, true> = {
    type: true,
    uuid: true,
    url: true,
    layout: true,
    oembed: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantVideoAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!VideoNode.isVideoNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
