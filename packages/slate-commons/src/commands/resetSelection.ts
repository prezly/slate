import type { SlateEditor } from '@udecode/plate-common';

import { findLeafLocation } from './findLeafLocation';
import { isValidLocation } from './isValidLocation';

export function resetSelection(editor: SlateEditor) {
    const locationLeaf = findLeafLocation(editor, [0]);

    if (locationLeaf && isValidLocation(editor, locationLeaf)) {
        editor.withoutNormalizing(() => {
            editor.select(locationLeaf);
            editor.collapse({ edge: 'start' });
        });

        return true;
    }

    return false;
}
