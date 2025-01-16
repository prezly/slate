import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate';

import { ButtonBlockNode } from '../ButtonBlockNode';

export function removeButtonBlock(
    editor: SlateEditor,
    buttonBlock?: ButtonBlockNode,
): ButtonBlockNode | null {
    return EditorCommands.removeNode(editor, {
        match: (node) =>
            buttonBlock ? node === buttonBlock : ButtonBlockNode.isButtonBlockNode(node),
    });
}
