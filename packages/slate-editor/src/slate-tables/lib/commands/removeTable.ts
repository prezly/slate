import type { Location } from 'slate';
import { Editor, Transforms } from 'slate';

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

    const [, nodeToFocusPath] =
        Editor.next(editor, { at: traverse.matrix.path }) ??
        Editor.previous(editor, { at: matrix.path }) ??
        [];

    editor.focusEditor(editor);

    if (nodeToFocusPath) {
        Transforms.select(editor, {
            path: nodeToFocusPath,
            offset: 0,
        });
    }

    Transforms.removeNodes(editor, { at: matrix.path });

    return true;
}
