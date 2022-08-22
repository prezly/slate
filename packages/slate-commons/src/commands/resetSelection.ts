import { Editor } from 'slate';
import { Transforms } from 'slate';

import { findLeafLocation } from './findLeafLocation';
import { isValidLocation } from './isValidLocation';

export function resetSelection(editor: Editor) {
    const locationLeaf = findLeafLocation(editor, [0]);

    if (locationLeaf && isValidLocation(editor, locationLeaf)) {
        Editor.withoutNormalizing(editor, () => {
            Transforms.select(editor, locationLeaf);
            Transforms.collapse(editor, { edge: 'start' });
        });

        return true;
    }

    return false;
}
