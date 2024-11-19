/* eslint-disable no-param-reassign */

import type { SlateEditor } from '@udecode/plate-common';
import type { Node } from 'slate';
import { Text } from 'slate';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';
import { insertEmptyParagraph } from './insertEmptyParagraph';
import { isAtEmptyBlock } from './isAtEmptyBlock';
import { isBlock } from './isBlock';
import { isCursorInEmptyParagraph } from './isCursorInEmptyParagraph';
import { isInline } from './isInline';
import { isVoid } from './isVoid';
import { roughlyNormalizeNodes } from './roughly-normalize';

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

export function insertNodes(editor: SlateEditor, nodes: Node[], options: Options = {}): void {
    insertNormalizedNodes(editor, roughlyNormalizeNodes(nodes), options);
}

function insertNormalizedNodes(editor: SlateEditor, nodes: Node[], options: Options = {}): void {
    if (!editor.selection || nodes.length === 0) {
        return;
    }

    const { mode, ensureEmptyParagraphAfter } = options;

    // In case we're inserting things into an empty paragraph, we will want to replace that paragraph.
    const initialSelection = editor.selection;
    const isInitialSelectionAtEmptyBlock = isAtEmptyBlock(editor);
    // @ts-expect-error TODO: Fix this
    const isAppendingToCurrentNode = Text.isText(nodes[0]) || editor.isInline(nodes[0]);
    const isInsertingBlockNodes = nodes.some((node) => isBlock(editor, node));

    for (const node of nodes) {
        const currentNodeEntry = getCurrentNodeEntry(editor);

        if (currentNodeEntry) {
            const [currentNode] = currentNodeEntry;

            if (isVoid(editor, currentNode) && !isBlock(editor, node)) {
                insertEmptyParagraph(editor);
            }

            if (isInline(editor, node)) {
                // Slate does not allow inline nodes next to inline nodes.
                // Adding text nodes around it helps to prevent unwanted side-effects.
                //
                // @see https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
                //
                // > 4. Inline nodes cannot be the first or last child of a parent block,
                // >    nor can it be next to another inline node in the children array.
                // >    If this is the case, an empty text node will be added to correct
                // >    this to be in compliance with the constraint.
                // @ts-expect-error TODO: Fix this
                editor.insertFragment([{ text: '' }, node, { text: '' }]);
            } else {
                editor.insertNodes([node], { mode });
            }
        }
    }

    // Every time we call `Transforms.insertNodes` or `Transforms.insertFragment`
    // the cursor/selection will move (as long as we're inserting something).
    // That's why we have to check `isCursorInEmptyParagraph` again.
    if (ensureEmptyParagraphAfter && !isCursorInEmptyParagraph(editor) && isInsertingBlockNodes) {
        insertEmptyParagraph(editor);
    }

    if (isInitialSelectionAtEmptyBlock && !isAppendingToCurrentNode) {
        // Remove the node that was at the initial selection, so that the element being
        // inserted effectively replaces it.
        // If we called `removeNodes` first (before `insertNodes`) then the selection could
        // move to an unexpected location, and the new `element` would get inserted there.
        // For example, if originally selected element was preceeded by a "list",
        // the selection would move to the last "list-item-text" in that "list", and
        // `element` would get inserted as a child of that "list-item-text".
        editor.removeNodes({ at: initialSelection });
    }

    // Some normalizing operations may not trigger follow-up normalizations, so we want
    // to force one more loop of normalizations. This happens e.g. when fixing hierarchy
    // when pasting lists.
    editor.normalize({ force: true });
}
