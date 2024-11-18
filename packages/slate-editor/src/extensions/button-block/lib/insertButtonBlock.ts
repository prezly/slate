import { EditorCommands } from '@prezly/slate-commons';
import type { Alignment } from '@prezly/slate-types';
import { isAlignableElement, isImageNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import { Node, Path, Range } from 'slate';

import type { ButtonBlockNode } from '../ButtonBlockNode';

import { createButtonBlock } from './createButtonBlock';

export function insertButtonBlock(
    editor: SlateEditor,
    props: Partial<Omit<ButtonBlockNode, 'type' | 'children'>> = {},
    defaultAlignment?: Alignment,
) {
    const { layout = inferPrevBlockAlignment(editor) ?? defaultAlignment } = props;

    const button = createButtonBlock({ ...props, layout });

    EditorCommands.insertNodes(editor, [button], { ensureEmptyParagraphAfter: true });

    return button;
}

function inferPrevBlockAlignment(editor: SlateEditor): Alignment | undefined {
    const block = prevBlock(editor);
    if (block && (isAlignableElement(block) || isImageNode(block))) {
        return block.align;
    }
    return undefined;
}

function prevBlock(editor: SlateEditor): Node | undefined {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
        const topLevelPath = editor.selection.focus.path.slice(0, 1);
        if (Path.hasPrevious(topLevelPath)) {
            // @ts-expect-error TODO: Fix this
            return Node.get(editor, Path.previous(topLevelPath));
        }
    }
    return undefined;
}
