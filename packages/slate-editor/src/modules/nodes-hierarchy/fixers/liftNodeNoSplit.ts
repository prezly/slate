import { ElementApi, type NodeEntry, PathApi, type SlateEditor } from '@udecode/plate';

/**
 * This fixer just moves node up, without parent node splitting
 */
export function liftNodeNoSplit(editor: SlateEditor, [, path]: NodeEntry) {
    const ancestor = editor.api.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!ElementApi.isElement(ancestorNode)) {
        return false;
    }

    editor.tf.moveNodes({ at: path, to: PathApi.parent(path), voids: true });

    return true;
}
