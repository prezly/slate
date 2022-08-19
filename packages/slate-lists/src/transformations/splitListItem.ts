import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Node, Path, Range, Transforms } from 'slate';

import { NESTED_LIST_PATH_INDEX, TEXT_PATH_INDEX } from '../constants';
import { getListItemsInRange } from '../lib';
import type { ListsEditor } from '../types';

/**
 * Collapses the current selection (by removing everything in it) and if the cursor
 * ends up in a "list-item" node, it will break that "list-item" into 2 nodes, splitting
 * the text at the cursor location.
 */
export function splitListItem(editor: ListsEditor): void {
    if (!editor.selection) {
        return;
    }

    if (Range.isExpanded(editor.selection)) {
        // Remove everything in selection (this will collapse the selection).
        Transforms.delete(editor);
    }

    const listItemsInSelection = getListItemsInRange(editor, editor.selection);

    if (listItemsInSelection.length !== 1) {
        // Selection is collapsed, so there should be either 0 or 1 "list-item" in selection.
        // When no "list-items" are selected - there's no "list-item" to split.
        return;
    }

    // Selection is collapsed, `editor.selection.anchor` is equal to `editor.selection.focus`.
    const cursorPoint = editor.selection.anchor;
    const [[listItemNode, listItemPath]] = listItemsInSelection;
    const listItemTextPath = [...listItemPath, TEXT_PATH_INDEX];
    const { isEnd, isStart } = EditorCommands.getCursorPositionInNode(
        editor,
        cursorPoint,
        listItemTextPath,
    );

    if (isStart) {
        const newListItem = editor.createListItemNode({
            children: [editor.createListItemTextNode()],
        });
        Transforms.insertNodes(editor, newListItem, { at: listItemPath });
        return;
    }

    const newListItemPath = Path.next(listItemPath);
    const newListItemTextPath = Path.next(listItemTextPath);
    const hasNestedList = Node.has(listItemNode, [NESTED_LIST_PATH_INDEX]); // listItemNode.children.length > 1

    Editor.withoutNormalizing(editor, () => {
        if (isEnd) {
            const newListItem = editor.createListItemNode({
                children: [editor.createListItemTextNode()],
            });
            Transforms.insertNodes(editor, newListItem, { at: newListItemPath });
            // Move the cursor to the new "list-item".
            Transforms.select(editor, newListItemPath);
        } else {
            // Split current "list-item-text" element into 2.
            Transforms.splitNodes(editor);

            // The current "list-item-text" has a parent "list-item", the new one needs its own.
            Transforms.wrapNodes(editor, editor.createListItemNode(), { at: newListItemTextPath });

            // Move the new "list-item" up to be a sibling of the original "list-item".
            Transforms.moveNodes(editor, {
                at: newListItemTextPath,
                to: newListItemPath,
            });
        }

        // If there was a "list" in the "list-item" move it to the new "list-item".
        if (hasNestedList) {
            Transforms.moveNodes(editor, {
                at: Path.next(listItemTextPath),
                to: [...newListItemPath, NESTED_LIST_PATH_INDEX],
            });
        }
    });
}
