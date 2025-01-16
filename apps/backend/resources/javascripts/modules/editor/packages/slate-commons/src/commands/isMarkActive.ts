import type { SlateEditor, Text } from '@udecode/plate';

export function isMarkActive<T extends Text>(
    editor: SlateEditor,
    mark: keyof Omit<T, 'text'>,
): boolean {
    const marks = editor.marks as Record<keyof T, boolean> | null;
    return marks ? marks[mark] === true : false;
}
