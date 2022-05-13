import { EditorCommands } from '@prezly/slate-commons';
import type { CoverageNode } from '@prezly/slate-types';
import { isCoverageNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const SHAPE: Record<keyof CoverageNode, boolean> = {
    type: true,
    uuid: true,
    coverage: true,
    children: true,
    layout: true,
    new_tab: true,
    show_thumbnail: true,
};
const ALLOWED_ATTRIBUTES = Object.keys(SHAPE);

export function normalizeRedundantCoverageAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isCoverageNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
