import type { Location } from 'slate';
import { Transforms } from 'slate';

import { Traverse } from '../core';
import type { TableEditor } from '../TableEditor';

export function removeTable(
    editor: TableEditor,
    location: Location | undefined = editor.selection ?? undefined,
) {
    if (!location) {
        return false;
    }

    const traverse = Traverse.create(editor, location);

    if (!traverse) {
        return false;
    }

    const { matrix } = traverse;

    editor.focusEditor();

    Transforms.removeNodes(editor, { at: matrix.path });

    return true;
}
