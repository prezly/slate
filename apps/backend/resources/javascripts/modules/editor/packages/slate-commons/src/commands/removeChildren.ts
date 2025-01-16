import { type SlateEditor, type NodeEntry, ElementApi, TextApi } from '@udecode/plate';

/**
 * Ensures given element has a single, empty `Text` child.
 * Returns `true` when removal occurred.
 * Returns `false` when nothing changed.
 */
export function removeChildren(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!ElementApi.isElement(node)) {
        return false;
    }

    const [child] = node.children;

    if (node.children.length === 1 && TextApi.isText(child) && child.text.length === 0) {
        return false;
    }

    editor.tf.withoutNormalizing(() => {
        editor.tf.insertNodes([{ text: '' }], { at: [...path, 0] });

        node.children.forEach(() => {
            editor.tf.removeNodes({
                at: [...path, 1],
                voids: true,
            });
        });
    });

    return true;
}
