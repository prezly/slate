import type { SlateEditor } from '@udecode/plate';

import { findLeafLocation } from './findLeafLocation';
import { isValidLocation } from './isValidLocation';

export function resetSelection(editor: SlateEditor) {
    const locationLeaf = findLeafLocation(editor, [0]);

    if (locationLeaf && isValidLocation(editor, locationLeaf)) {
        editor.tf.withoutNormalizing(() => {
            editor.tf.select(locationLeaf);
            editor.tf.collapse({ edge: 'start' });
        });

        return true;
    }

    return false;
}
