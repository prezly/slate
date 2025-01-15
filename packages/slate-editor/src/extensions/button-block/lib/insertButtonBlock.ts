import { EditorCommands } from '@prezly/slate-commons';
import type { Alignment } from '@prezly/slate-types';
import { isAlignableElement, isImageNode } from '@prezly/slate-types';
import { type Node, PathApi, RangeApi, type SlateEditor } from '@udecode/plate';

import type { ButtonBlockNode } from '../ButtonBlockNode';

import { createButtonBlock } from './createButtonBlock';

export function insertButtonBlock(
    editor: SlateEditor,
    props: Partial<
        Pick<ButtonBlockNode, 'href' | 'new_tab' | 'layout' | 'variant' | 'uuid' | 'label'>
    > = {},
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
    if (editor.selection && RangeApi.isCollapsed(editor.selection)) {
        const topLevelPath = editor.selection.focus.path.slice(0, 1);
        if (PathApi.hasPrevious(topLevelPath)) {
            const previousPath = PathApi.previous(topLevelPath);
            if (!previousPath) {
                return undefined;
            }

            const nodeEntry = editor.api.node(previousPath);
            if (!nodeEntry) {
                return undefined;
            }

            const [node] = nodeEntry;
            return node;
        }
    }
    return undefined;
}
