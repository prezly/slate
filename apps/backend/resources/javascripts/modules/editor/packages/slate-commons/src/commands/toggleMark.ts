import type { SlateEditor, Text } from '@udecode/plate';

import { isMarkActive } from './isMarkActive';

export function toggleMark<T extends Text>(
    editor: SlateEditor,
    mark: keyof Omit<T, 'text'>,
    force?: boolean,
): void {
    const shouldSet = force ?? !isMarkActive(editor, mark);

    if (shouldSet) {
        editor.tf.addMark(mark as string, true);
    } else {
        editor.tf.removeMark(mark as string);
    }
}
