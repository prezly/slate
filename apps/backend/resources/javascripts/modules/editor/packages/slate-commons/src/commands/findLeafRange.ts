import type { SlateEditor } from '@udecode/plate-common';
import type { Range } from 'slate';

import { findLeafPoint } from './findLeafPoint';

export function findLeafRange(editor: SlateEditor, range: Range): Range | undefined {
    const anchor = findLeafPoint(editor, range.anchor);
    const focus = findLeafPoint(editor, range.focus);

    if (!anchor || !focus) {
        // If any leaf point is missing, we have no way of reasonably guessing it to
        // form a valid range.
        return undefined;
    }

    return { anchor, focus };
}
