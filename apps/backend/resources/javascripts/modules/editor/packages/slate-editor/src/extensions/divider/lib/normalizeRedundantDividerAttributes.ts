import { EditorCommands } from '@prezly/slate-commons';
import { isDividerNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { createDivider } from './createDivider';

const ALLOWED_ATTRIBUTES = Object.keys(createDivider());

export function normalizeRedundantDividerAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!isDividerNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
