import type { Editor } from 'slate';
import { Transforms } from 'slate';

import type { MentionElementType } from '../types';

export function insertMention(
    editor: Editor,
    element: MentionElementType,
    moveCursorAfterInsert = true,
) {
    Transforms.insertNodes(editor, element);

    if (moveCursorAfterInsert) {
        Transforms.move(editor, { distance: 1, unit: 'offset' });
    }
}
