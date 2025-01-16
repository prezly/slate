import { EditorCommands } from '@prezly/slate-commons';
import type { ParagraphNode } from '@prezly/slate-types';
import { isParagraphNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

const shape: Record<keyof ParagraphNode, true> = {
    type: true,
    align: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantParagraphAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isParagraphNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
