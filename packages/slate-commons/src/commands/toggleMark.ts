import type { Text } from 'slate';
import { Editor } from 'slate';

import { isMarkActive } from './isMarkActive';

export function toggleMark(editor: Editor, mark: keyof Omit<Text, 'text'>): void {
    if (isMarkActive(editor, mark)) {
        Editor.removeMark(editor, mark);
    } else {
        Editor.addMark(editor, mark, true);
    }
}
