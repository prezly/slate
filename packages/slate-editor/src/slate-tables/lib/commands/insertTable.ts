import type { Location } from 'slate';
import { Editor, Transforms } from 'slate';

import { TableNode } from '../nodes';

export function insertTable(
    editor: Editor,
    location: Location | undefined = editor.selection ?? undefined,
) {
    if (!location) {
        return false;
    }

    Transforms.insertNodes(editor, TableNode.createTableNode(editor, 3, 3), { at: location });

    const [, newTablePath] = Editor.next(editor, { at: location }) ?? [];

    editor.focusEditor(editor);

    if (newTablePath) {
        Transforms.select(
            editor,
            Editor.start(editor, {
                path: newTablePath,
                offset: 0,
            }),
        );
    }

    return true;
}
