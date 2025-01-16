import { getAboveNode, isElement, type SlateEditor, type TNodeEntry } from '@udecode/plate-common';

export function unwrapSameTypeChild(editor: SlateEditor, [node, path]: TNodeEntry) {
    const ancestor = getAboveNode(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!isElement(ancestorNode)) {
        return false;
    }

    if ('type' in node && node.type == ancestorNode.type && ancestorNode.children.length === 1) {
        editor.unwrapNodes({ at: ancestorPath, voids: true });
        return true;
    }

    return false;
}
