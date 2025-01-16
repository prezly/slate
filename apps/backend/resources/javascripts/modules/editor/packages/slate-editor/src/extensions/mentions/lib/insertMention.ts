import type { SlateEditor } from '@udecode/plate';

import type { MentionElementType } from '../types';

export function insertMention(
    editor: SlateEditor,
    element: MentionElementType,
    moveCursorAfterInsert = true,
) {
    editor.tf.insertNodes(element);

    if (moveCursorAfterInsert) {
        editor.tf.move({ distance: 1, unit: 'offset' });
    }
}
