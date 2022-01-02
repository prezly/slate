/* eslint-disable no-param-reassign */

import type { Node } from 'slate';
import { Editor, Text, Transforms } from 'slate';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';
import { insertEmptyParagraph } from './insertEmptyParagraph';
import { isCursorInEmptyParagraph } from './isCursorInEmptyParagraph';

interface Options {
    ensureEmptyParagraphAfter?: boolean;
    /**
     *`mode: 'highest'` is required to properly handle hierarchical nodes.
     *
     * For example if `node[i]` is a "list", and `node[i + 1]` is a "paragraph",
     * after `node[i]` is inserted cursor will be placed in the last "list-item"
     * in that "list", and then `node[i + 1]` would be inserted as a child of that "list-item".
     * With `mode: 'highest'`, `node[i + 1]` will be inserted at the root of the document instead.
     */
    mode?: 'highest' | 'lowest';
}

export function insertNodes(editor: Editor, nodes: Node[], options: Options = {}): void {
    if (!editor.selection || nodes.length === 0) {
        return;
    }

    // In case we're inserting things into an empty paragraph, we will want to replace that paragraph.
    const initialSelection = editor.selection;
    const wasInitialSelectionInEmptyParagraph = isCursorInEmptyParagraph(editor);
    const isAppendingToCurrentNode = Text.isText(nodes[0]) || Editor.isInline(editor, nodes[0]);
    const isAddingAnyBlockNodes = nodes.some((node) => Editor.isBlock(editor, node));

    for (const node of nodes) {
        const currentNodeEntry = getCurrentNodeEntry(editor);

        if (currentNodeEntry) {
            const [currentNode] = currentNodeEntry;

            if (Editor.isVoid(editor, currentNode) && !Editor.isBlock(editor, node)) {
                insertEmptyParagraph(editor);
            }

            if (Editor.isInline(editor, node)) {
                // For some reason Slate will split existing block nodes when inserting inline nodes.
                // We don't want that. Adding an empty text node before and after seems to do the
                // trick. I don't know why.
                Transforms.insertFragment(editor, [{ text: '' }, node, { text: '' }]);
            } else {
                Transforms.insertNodes(editor, [node], { mode: options.mode });
            }
        }
    }

    // Every time we call `Transforms.insertNodes` or `Transforms.insertFragment`
    // the cursor/selection will move (as long as we're inserting something).
    // That's why we have to check `isCursorInEmptyParagraph` again.
    if (
        options.ensureEmptyParagraphAfter &&
        !isCursorInEmptyParagraph(editor) &&
        isAddingAnyBlockNodes
    ) {
        insertEmptyParagraph(editor);
    }

    if (wasInitialSelectionInEmptyParagraph && !isAppendingToCurrentNode) {
        // Remove the node that was at the initial selection, so that the element being
        // inserted effectively replaces it.
        // If we called `removeNodes` first (before `insertNodes`) then the selection could
        // move to an unexpected location, and the new `element` would get inserted there.
        // For example, if originally selected element was preceeded by a "list",
        // the selection would move to the last "list-item-text" in that "list", and
        // `element` would get inserted as a child of that "list-item-text".
        Transforms.removeNodes(editor, { at: initialSelection });
    }

    // Some normalizing operations may not trigger follow-up normalizations, so we want
    // to force one more loop of normalizations. This happens e.g. when fixing hierarchy
    // when pasting lists.
    Editor.normalize(editor, { force: true });
}
