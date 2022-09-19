import { EditorCommands } from '@prezly/slate-commons';
import type { VariableKey } from '@prezly/slate-types';
import { isVariableNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import { createVariableNode } from './createVariableNode';

const ALLOWED_ATTRIBUTES = Object.keys(createVariableNode('' as VariableKey));

export function removeUnknownVariableNodeAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isVariableNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}
