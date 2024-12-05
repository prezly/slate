import { isElement, type SlateEditor, type TNodeEntry } from '@udecode/plate-common';
import { Path } from 'slate';

/**
 * This fixer just moves node up, without parent node splitting
 */
export function liftNodeNoSplit(editor: SlateEditor, [, path]: TNodeEntry) {
    const ancestor = editor.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!isElement(ancestorNode)) {
        return false;
    }

    editor.moveNodes({ at: path, to: Path.parent(path), voids: true });

    return true;
}
