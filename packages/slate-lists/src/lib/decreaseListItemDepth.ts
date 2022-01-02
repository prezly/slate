import type { Element } from 'slate';
import { Editor, Node, Path, Transforms } from 'slate';

import { NESTED_LIST_PATH_INDEX, TEXT_PATH_INDEX } from '../constants';
import type { ListsOptions } from '../types';

import { getParentList } from './getParentList';
import { getParentListItem } from './getParentListItem';
import { increaseListItemDepth } from './increaseListItemDepth';

/**
 * Decreases nesting depth of "list-item" at a given Path.
 */
export function decreaseListItemDepth(
    options: ListsOptions,
    editor: Editor,
    listItemPath: Path,
): void {
    const parentList = getParentList(options, editor, listItemPath);

    if (!parentList) {
        // It should never happen.
        return;
    }

    const [parentListNode, parentListPath] = parentList;
    const parentListItem = getParentListItem(options, editor, listItemPath);
    const listItemIndex = listItemPath[listItemPath.length - 1];
    const previousSiblings = parentListNode.children.slice(0, listItemIndex);
    const nextSiblings = parentListNode.children.slice(listItemIndex + 1);

    // We have to move all subsequent sibling "list-items" into a new "list" that will be
    // nested in the "list-item" we're trying to move.
    nextSiblings.forEach(() => {
        // The next sibling path is always the same, because once we move out the next sibling,
        // another one will take its place.
        const nextSiblingPath = [...parentListPath, listItemIndex + 1];
        increaseListItemDepth(options, editor, nextSiblingPath);
    });

    Editor.withoutNormalizing(editor, () => {
        if (parentListItem) {
            // Move the "list-item" to the grandparent "list".
            const [, parentListItemPath] = parentListItem;
            Transforms.moveNodes(editor, {
                at: listItemPath,
                to: Path.next(parentListItemPath),
            });

            // We've moved the "list-item" and all its subsequent sibling "list-items" out of this list.
            // So in case there are no more "list-items" left, we should remove the list.
            if (previousSiblings.length === 0) {
                Transforms.removeNodes(editor, { at: parentListPath });
            }
        } else {
            // Move the "list-item" to the root of the editor.
            const listItemTextPath = [...listItemPath, TEXT_PATH_INDEX];
            const listItemNestedListPath = [...listItemPath, NESTED_LIST_PATH_INDEX];

            if (Node.has(editor, listItemNestedListPath)) {
                Transforms.setNodes(
                    editor,
                    { type: parentListNode.type },
                    { at: listItemNestedListPath },
                );
                Transforms.liftNodes(editor, { at: listItemNestedListPath });
                Transforms.liftNodes(editor, { at: Path.next(listItemPath) });
            }

            if (Node.has(editor, listItemTextPath)) {
                Transforms.setNodes(
                    editor,
                    { type: options.defaultBlockType as Element['type'] },
                    { at: listItemTextPath },
                );
                Transforms.liftNodes(editor, { at: listItemTextPath });
                Transforms.liftNodes(editor, { at: listItemPath });
            }
        }
    });
}
