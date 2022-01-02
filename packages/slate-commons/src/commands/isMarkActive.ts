import type { Text } from 'slate';
import { Editor } from 'slate';

export function isMarkActive(editor: Editor, mark: keyof Omit<Text, 'text'>): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks[mark] === true : false;
}
