import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import type { ButtonBlockNode } from '../ButtonBlockNode';

import { createButtonBlock } from './createButtonBlock';

export function insertButtonBlock(
    editor: Editor,
    props: Partial<Omit<ButtonBlockNode, 'type' | 'children'>> = {},
) {
    const button = createButtonBlock(props);

    EditorCommands.insertNodes(editor, [button], { ensureEmptyParagraphAfter: true });

    return button;
}
