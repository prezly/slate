import { ElementApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

/**
 * This fixer can split parent node
 */
export function liftNodeWithSplit(editor: SlateEditor, [, path]: NodeEntry) {
    const ancestor = editor.api.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!ElementApi.isElement(ancestorNode)) {
        return false;
    }

    editor.tf.liftNodes({ at: path, voids: true });

    return true;
}
