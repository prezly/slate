import type { SlateEditor } from '@udecode/plate-common';

import type { ButtonBlockNode } from '../ButtonBlockNode';

export function updateButtonBlock(
    editor: SlateEditor,
    buttonBlock: ButtonBlockNode,
    patch: Partial<Pick<ButtonBlockNode, 'href' | 'label' | 'layout' | 'variant' | 'new_tab'>>,
) {
    editor.setNodes<ButtonBlockNode>(patch, {
        at: [],
        match: (node) => node === buttonBlock,
    });
}
