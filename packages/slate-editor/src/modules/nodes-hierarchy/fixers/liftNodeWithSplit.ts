import type { SlateEditor } from '@udecode/plate-common';
import { Element } from 'slate';
import type { NodeEntry } from 'slate';

/**
 * This fixer can split parent node
 */
export function liftNodeWithSplit(editor: SlateEditor, [, path]: NodeEntry) {
    const ancestor = editor.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    editor.liftNodes({ at: path, voids: true });

    return true;
}
