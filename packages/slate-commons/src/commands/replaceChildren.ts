import type { SlateEditor } from '@udecode/plate-common';
import type { Node, NodeEntry } from 'slate';
import { Element } from 'slate';

/**
 * Replaces the given element children with a new list of nodes.
 * If the new list is empty, an empty text leaf is added automatically.
 *
 * @returns {boolean} True, if the change has been applied.
 */
export function replaceChildren(
    editor: SlateEditor,
    [node, path]: NodeEntry,
    children: Node[],
): boolean {
    if (!Element.isElement(node)) {
        return false;
    }

    const newChildren: Node[] = children.length === 0 ? [{ text: '' }] : children;

    editor.withoutNormalizing(() => {
        node.children.forEach(() => {
            editor.removeNodes({
                at: [...path, 0],
                voids: true,
            });
        });

        editor.insertNodes(newChildren, {
            at: [...path, 0],
            voids: true,
        });
    });

    return true;
}
