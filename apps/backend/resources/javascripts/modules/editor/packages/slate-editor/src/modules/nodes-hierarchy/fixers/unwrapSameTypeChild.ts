import { ElementApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

export function unwrapSameTypeChild(editor: SlateEditor, [node, path]: NodeEntry) {
    const ancestor = editor.api.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!ElementApi.isElement(ancestorNode)) {
        return false;
    }

    if ('type' in node && node.type == ancestorNode.type && ancestorNode.children.length === 1) {
        editor.tf.unwrapNodes({ at: ancestorPath, voids: true });
        return true;
    }

    return false;
}
