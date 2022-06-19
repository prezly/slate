import type { Location } from 'slate';
import { Transforms } from 'slate';

import { TableNode } from '../nodes';
import type { TableEditor } from '../TableEditor';

export function insertTable(
    editor: TableEditor,
    location: Location | undefined = editor.selection ?? undefined,
) {
    if (!location) {
        return false;
    }

    Transforms.insertNodes(editor, TableNode.createTableNode(editor, 3, 3), { at: location });

    editor.focusEditor(editor);

    return true;
}
