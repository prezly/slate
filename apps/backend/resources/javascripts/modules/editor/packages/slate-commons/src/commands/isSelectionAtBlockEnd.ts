import { RangeApi, type SlateEditor } from '@udecode/plate';

import { isBlock } from './isBlock';

export function isSelectionAtBlockEnd(editor: SlateEditor): boolean {
    if (!editor.selection) {
        // Cannot determine the location if there is no selection.
        return false;
    }

    const endOfSelection = RangeApi.end(editor.selection);
    const blockAbove = editor.api.above({ match: (node) => isBlock(editor, node) });

    if (!blockAbove) {
        return false;
    }

    const [, endOfBlock] = blockAbove;

    return editor.api.isEnd(endOfSelection, endOfBlock);
}
