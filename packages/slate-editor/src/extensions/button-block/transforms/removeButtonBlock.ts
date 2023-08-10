import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { ButtonBlockNode } from '../ButtonBlockNode';

export function removeButtonBlock(
    editor: Editor,
    buttonBlock?: ButtonBlockNode,
): ButtonBlockNode | null {
    return EditorCommands.removeNode<ButtonBlockNode>(editor, {
        match: (node) =>
            buttonBlock ? node === buttonBlock : ButtonBlockNode.isButtonBlockNode(node),
    });
}
