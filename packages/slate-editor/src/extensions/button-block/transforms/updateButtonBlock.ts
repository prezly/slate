import type { SlateEditor } from '@udecode/plate';

import type { ButtonBlockNode } from '../ButtonBlockNode';

export function updateButtonBlock(
    editor: SlateEditor,
    buttonBlock: ButtonBlockNode,
    patch: Partial<Pick<ButtonBlockNode, 'href' | 'label' | 'layout' | 'variant' | 'new_tab'>>,
) {
    editor.tf.setNodes<ButtonBlockNode>(patch, {
        at: [],
        match: (node) => node === buttonBlock,
    });
}
