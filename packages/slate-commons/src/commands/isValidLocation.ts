import type { Location } from 'slate';
import { Editor, Node } from 'slate';

function isValidLocation(editor: Editor, location: Location): boolean {
    try {
        return Node.has(editor, Editor.path(editor, location));
    } catch {
        return false;
    }
}

export default isValidLocation;
