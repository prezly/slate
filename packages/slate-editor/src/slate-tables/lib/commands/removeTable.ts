import type { Location , Editor} from 'slate';
import { Transforms } from 'slate';

import { Traverse } from '../core';

export function removeTable(
    editor: Editor,
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

    editor.focusEditor(editor);

    Transforms.removeNodes(editor, { at: matrix.path });

    return true;
}
