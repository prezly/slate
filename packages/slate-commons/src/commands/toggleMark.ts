import type { Text } from 'slate';
import { Editor } from 'slate';

import { isMarkActive } from './isMarkActive';

export function toggleMark(editor: Editor, mark: keyof Omit<Text, 'text'>, force?: boolean): void {
    const shouldSet = force ?? !isMarkActive(editor, mark);

    if (shouldSet) {
        Editor.addMark(editor, mark, true);
    } else {
        Editor.removeMark(editor, mark);
    }
}
