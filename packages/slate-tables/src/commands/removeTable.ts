import { focusEditor } from '@udecode/plate-common/react';
import { type Location } from 'slate';

import { Traverse } from '../core';
import type { TablesEditor } from '../TablesEditor';

export function removeTable(
    editor: TablesEditor,
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

    focusEditor(editor);

    editor.removeNodes({ at: matrix.path });

    return true;
}
