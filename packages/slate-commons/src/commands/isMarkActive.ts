import type { SlateEditor } from '@udecode/plate-common';
import type { Text } from 'slate';

export function isMarkActive<T extends Text>(editor: SlateEditor, mark: keyof Omit<T, 'text'>): boolean {
    const marks = editor.getMarks() as Record<keyof T, boolean>;
    return marks ? marks[mark] === true : false;
}
