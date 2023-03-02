import { Editor, Range } from 'slate';

import { isBlock } from './isBlock';

export function isSelectionAtBlockEnd(editor: Editor): boolean {
    if (!editor.selection) {
        // Cannot determine the location if there is no selection.
        return false;
    }

    const endOfSelection = Range.end(editor.selection);
    const blockAbove = Editor.above(editor, { match: (node) => isBlock(editor, node) });

    if (!blockAbove) {
        return false;
    }

    const [, endOfBlock] = blockAbove;

    return Editor.isEnd(editor, endOfSelection, endOfBlock);
}
