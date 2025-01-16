import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';
import { Node } from 'slate';

export function isValidLocation(editor: SlateEditor, location: Location): boolean {
    try {
        return Node.has(editor, editor.path(location));
    } catch {
        return false;
    }
}
