import type { SlateEditor } from '@udecode/plate-common';
import type { Text } from 'slate';

import { isMarkActive } from './isMarkActive';

export function toggleMark<T extends Text>(
    editor: SlateEditor,
    mark: keyof Omit<T, 'text'>,
    force?: boolean,
): void {
    const shouldSet = force ?? !isMarkActive(editor, mark);

    if (shouldSet) {
        editor.addMark(mark as string, true);
    } else {
        editor.removeMark(mark as string);
    }
}
