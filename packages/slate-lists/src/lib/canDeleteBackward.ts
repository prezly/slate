import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import type { ListsOptions } from '../types';

import getListItemsInRange from './getListItemsInRange';
import getParentListItem from './getParentListItem';
import isCursorAtStartOfListItem from './isCursorAtStartOfListItem';

/**
 * Returns true when editor.deleteBackward() is safe to call (it won't break the structure).
 */
const canDeleteBackward = (options: ListsOptions, editor: Editor): boolean => {
    const listItemsInSelection = getListItemsInRange(options, editor, editor.selection);

    if (listItemsInSelection.length === 0) {
        return true;
    }

    const [[, listItemPath]] = listItemsInSelection;
    const isInNestedList = getParentListItem(options, editor, listItemPath) !== null;
    const isFirstListItem = EditorCommands.getPreviousSibling(editor, listItemPath) === null;
    return isInNestedList || !isFirstListItem || !isCursorAtStartOfListItem(options, editor);
};

export default canDeleteBackward;
