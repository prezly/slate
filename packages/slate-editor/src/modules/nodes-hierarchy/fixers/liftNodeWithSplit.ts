import { getAboveNode, isElement, type SlateEditor, type TNodeEntry } from '@udecode/plate-common';

/**
 * This fixer can split parent node
 */
export function liftNodeWithSplit(editor: SlateEditor, [, path]: TNodeEntry) {
    const ancestor = getAboveNode(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!isElement(ancestorNode)) {
        return false;
    }

    editor.liftNodes({ at: path, voids: true });

    return true;
}
