import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { ListsOptions } from '../types';

import isCursorAtStartOfListItem from './isCursorAtStartOfListItem';
import getListItemsInRange from './getListItemsInRange';
import getParentListItem from './getParentListItem';

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
