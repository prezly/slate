import type { Text } from 'slate';
import { Editor } from 'slate';

import { isMarkActive } from './isMarkActive';

export function toggleMark<T extends Text>(editor: Editor, mark: keyof Omit<T, 'text'>, force?: boolean): void {
    const shouldSet = force ?? !isMarkActive(editor, mark);

    if (shouldSet) {
        Editor.addMark(editor, mark as string, true);
    } else {
        Editor.removeMark(editor, mark as string);
    }
}
