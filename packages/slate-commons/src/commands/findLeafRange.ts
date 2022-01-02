import type { Editor, Range } from 'slate';

import { findLeafPoint } from './findLeafPoint';

export function findLeafRange(editor: Editor, range: Range): Range | null {
    const anchor = findLeafPoint(editor, range.anchor);
    const focus = findLeafPoint(editor, range.focus);

    if (!anchor || !focus) {
        // If any leaf point is missing, we have no way of reasonably guessing it to
        // form a valid range.
        return null;
    }

    return { anchor, focus };
}
