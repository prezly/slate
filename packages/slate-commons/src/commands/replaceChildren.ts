import {
    type Editor,
    ElementApi,
    type ElementOrTextOf,
    type NodeEntry,
    type SlateEditor,
} from '@udecode/plate';

/**
 * Replaces the given element children with a new list of nodes.
 * If the new list is empty, an empty text leaf is added automatically.
 *
 * @returns {boolean} True, if the change has been applied.
 */
export function replaceChildren(
    editor: SlateEditor,
    [node, path]: NodeEntry,
    children: ElementOrTextOf<Editor>[],
): boolean {
    if (!ElementApi.isElement(node)) {
        return false;
    }

    const newChildren: ElementOrTextOf<Editor>[] =
        children.length === 0 ? [{ text: '' }] : children;

    editor.tf.withoutNormalizing(() => {
        node.children.forEach(() => {
            editor.tf.removeNodes({
                at: [...path, 0],
                voids: true,
            });
        });

        editor.tf.insertNodes(newChildren, {
            at: [...path, 0],
            voids: true,
        });
    });

    return true;
}
