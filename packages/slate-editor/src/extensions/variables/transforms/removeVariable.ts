import { EditorCommands } from '@prezly/slate-commons';
import type { VariableNode } from '@prezly/slate-types';
import { isVariableNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeVariable(editor: Editor): VariableNode | null {
    return EditorCommands.removeNode<VariableNode>(editor, {
        match: isVariableNode,
    });
}
