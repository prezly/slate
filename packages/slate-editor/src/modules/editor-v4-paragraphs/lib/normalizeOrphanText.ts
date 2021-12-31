import { EditorCommands } from '@prezly/slate-commons';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { Node, NodeEntry } from 'slate';
import { Editor, Element, Text, Transforms } from 'slate';

/**
 * If there's a Text node at the root of the document, we have to wrap it in a paragraph.
 * This can happen during pasting (e.g. from Google Docs).
 * It may happen that there are multiple Text nodes next to each other (e.g. with different
 * Marks), so we're going to want to put them into the same paragraph.
 * We're going backwards (taking previous siblings) because Slate is running normalization
 * backwards.
 */
function normalizeOrphanText(editor: Editor, [node, path]: NodeEntry<Node>): boolean {
    if (path.length > 1) {
        // Optimization: if `path` array is longer than 1, then this node is not at the
        // root of the document.
        return false;
    }

    if (!Text.isText(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const parentNode = Editor.above(editor, { at: path });

    if (parentNode && Element.isElement(parentNode[0])) {
        // If there is a parent block element, then the fix does not apply.
        return false;
    }

    Editor.withoutNormalizing(editor, () => {
        Transforms.wrapNodes(editor, { type: PARAGRAPH_NODE_TYPE, children: [] }, { at: path });

        let nextMergePath = path;
        let previousSibling = EditorCommands.getPreviousSibling(editor, nextMergePath);

        while (previousSibling && Text.isText(previousSibling[0])) {
            Transforms.wrapNodes(
                editor,
                { type: PARAGRAPH_NODE_TYPE, children: [] },
                { at: previousSibling[1] },
            );
            Transforms.mergeNodes(editor, { at: nextMergePath });
            nextMergePath = previousSibling[1];
            previousSibling = EditorCommands.getPreviousSibling(editor, nextMergePath);
        }
    });

    return true;
}

export default normalizeOrphanText;
