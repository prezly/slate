import { type Location } from '@udecode/plate';

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

    editor.tf.focus();

    editor.tf.removeNodes({ at: matrix.path });

    return true;
}
