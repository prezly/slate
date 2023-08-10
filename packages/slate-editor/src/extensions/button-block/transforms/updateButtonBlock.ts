import type { Editor } from 'slate';
import { Transforms } from 'slate';

import type { ButtonBlockNode } from '../ButtonBlockNode';

export function updateButtonBlock(
    editor: Editor,
    buttonBlock: ButtonBlockNode,
    patch: Partial<Pick<ButtonBlockNode, 'href' | 'label' | 'layout' | 'variant' | 'new_tab'>>,
) {
    Transforms.setNodes<ButtonBlockNode>(editor, patch, {
        at: [],
        match: (node) => node === buttonBlock,
    });
}
