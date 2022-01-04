import type { Location } from 'slate';
import { Editor, Node } from 'slate';

export function isValidLocation(editor: Editor, location: Location): boolean {
    try {
        return Node.has(editor, Editor.path(editor, location));
    } catch {
        return false;
    }
}
