import type { Text } from 'slate';
import { Editor } from 'slate';

export function isMarkActive<T extends Text>(editor: Editor, mark: keyof Omit<T, 'text'>): boolean {
    const marks = Editor.marks(editor) as Record<typeof mark, boolean>;
    return marks ? marks[mark] === true : false;
}
