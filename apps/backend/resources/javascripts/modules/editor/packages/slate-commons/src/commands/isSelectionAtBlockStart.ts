import { RangeApi, type SlateEditor } from '@udecode/plate';

import { isBlock } from './isBlock';

export function isSelectionAtBlockStart(editor: SlateEditor): boolean {
    if (!editor.selection) {
        // Cannot determine the location if there is no selection.
        return false;
    }

    const startOfSelection = RangeApi.start(editor.selection);
    const blockAbove = editor.api.above({
        match: (node) => isBlock(editor, node),
    });

    if (!blockAbove) {
        return false;
    }

    const [, startOfBlock] = blockAbove;

    return editor.api.isStart(startOfSelection, startOfBlock);
}
