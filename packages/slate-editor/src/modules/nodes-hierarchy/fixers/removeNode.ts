import { type Editor, ElementApi, type NodeEntry, PathApi } from '@udecode/plate';

export function removeNode(editor: Editor, [, path]: NodeEntry) {
    const targetPath = PathApi.parent(path);
    const ancestor = editor.api.above({ at: targetPath });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!ElementApi.isElement(ancestorNode)) {
        return false;
    }

    editor.tf.removeNodes({ at: targetPath, voids: true });

    return true;
}
