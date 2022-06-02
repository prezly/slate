import type { Location, Editor } from 'slate';
import { Transforms } from 'slate';

import { TableNode } from '../nodes';

export function insertTable(
    editor: Editor,
    location: Location | undefined = editor.selection ?? undefined,
) {
    if (!location) {
        return false;
    }

    Transforms.insertNodes(editor, TableNode.createTableNode(editor, 3, 3), { at: location });

    editor.focusEditor(editor);

    return true;
}
