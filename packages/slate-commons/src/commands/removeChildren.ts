import type { NodeEntry } from 'slate';
import { Editor, Element, Text, Transforms } from 'slate';

/**
 * Ensures given element has a single, empty `Text` child.
 * Returns `true` when removal occurred.
 * Returns `false` when nothing changed.
 */
function removeChildren(editor: Editor, [node, path]: NodeEntry): boolean {
    if (!Element.isElement(node)) {
        return false;
    }

    const [child] = node.children;

    if (node.children.length === 1 && Text.isText(child) && child.text.length === 0) {
        return false;
    }

    Editor.withoutNormalizing(editor, () => {
        Transforms.insertNodes(editor, [{ text: '' }], { at: [...path, 0] });

        node.children.forEach(() => {
            Transforms.removeNodes(editor, {
                at: [...path, 1],
                voids: true,
            });
        });
    });

    return true;
}

export default removeChildren;
