import type { SlateEditor } from '@udecode/plate-common';
import { Range } from 'slate';

import { isBlock } from './isBlock';

export function isSelectionAtBlockEnd(editor: SlateEditor): boolean {
    if (!editor.selection) {
        // Cannot determine the location if there is no selection.
        return false;
    }

    const endOfSelection = Range.end(editor.selection);
    const blockAbove = editor.above({ match: (node) => isBlock(editor, node) });

    if (!blockAbove) {
        return false;
    }

    const [, endOfBlock] = blockAbove;

    return editor.isEnd(endOfSelection, endOfBlock);
}
