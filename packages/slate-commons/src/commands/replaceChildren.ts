import type { Node, NodeEntry } from 'slate';
import { Editor, Element, Transforms } from 'slate';

/**
 * Replaces the given element children with a new list of nodes.
 * If the new list is empty, an empty text leaf is added automatically.
 *
 * @returns {boolean} True, if the change has been applied.
 */
export function replaceChildren(
    editor: Editor,
    [node, path]: NodeEntry,
    children: Node[],
): boolean {
    if (!Element.isElement(node)) {
        return false;
    }

    const newChildren: Node[] = children.length === 0 ? [{ text: '' }] : children;

    Editor.withoutNormalizing(editor, () => {
        node.children.forEach(() => {
            Transforms.removeNodes(editor, {
                at: [...path, 0],
                voids: true,
            });
        });

        Transforms.insertNodes(editor, newChildren, {
            at: [...path, 0],
            voids: true,
        });
    });

    return true;
}
