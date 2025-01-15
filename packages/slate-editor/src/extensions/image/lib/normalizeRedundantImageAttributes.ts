import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

const shape: Record<keyof ImageNode, true> = {
    type: true,
    file: true,
    href: true,
    align: true,
    layout: true,
    new_tab: true,
    width: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantImageAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isImageNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
