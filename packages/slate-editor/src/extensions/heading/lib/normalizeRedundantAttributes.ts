import { EditorCommands } from '@prezly/slate-commons';
import type { HeadingNode } from '@prezly/slate-types';
import { isHeadingNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

const shape: Record<keyof HeadingNode, true> = {
    type: true,
    role: true,
    align: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (isHeadingNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_ATTRIBUTES,
        );
    }

    return false;
}
