import type { SlateEditor } from '@udecode/plate-common';
import { Element, Path } from 'slate';
import type { NodeEntry } from 'slate';

/**
 * This fixer just moves node up, without parent node splitting
 */
export function liftNodeNoSplit(editor: SlateEditor, [, path]: NodeEntry) {
    const ancestor = editor.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    editor.moveNodes({ at: path, to: Path.parent(path), voids: true });

    return true;
}
