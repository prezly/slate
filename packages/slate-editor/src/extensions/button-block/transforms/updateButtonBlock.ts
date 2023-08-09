import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { ButtonBlockNode } from '../ButtonBlockNode';

export function updateButtonBlock(
    editor: Editor,
    patch: Partial<Pick<ButtonBlockNode, 'href' | 'label' | 'layout' | 'variant' | 'new_tab'>>,
) {
    Transforms.setNodes<ButtonBlockNode>(editor, patch, {
        at: [],
        match: ButtonBlockNode.isButtonBlockNode,
    });
}
