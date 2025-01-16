import { EditorCommands } from '@prezly/slate-commons';
import type { VariableNode } from '@prezly/slate-types';
import { isVariableNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function removeVariable(editor: SlateEditor): VariableNode | null {
    return EditorCommands.removeNode<VariableNode>(editor, {
        match: isVariableNode,
    });
}
