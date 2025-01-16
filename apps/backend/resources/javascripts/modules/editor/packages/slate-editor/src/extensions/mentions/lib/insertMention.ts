import type { SlateEditor } from '@udecode/plate-common';

import type { MentionElementType } from '../types';

export function insertMention(
    editor: SlateEditor,
    element: MentionElementType,
    moveCursorAfterInsert = true,
) {
    editor.insertNodes(element);

    if (moveCursorAfterInsert) {
        editor.move({ distance: 1, unit: 'offset' });
    }
}
