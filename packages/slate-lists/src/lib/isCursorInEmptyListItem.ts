import { Editor, Range } from 'slate';

import { ListsOptions } from '../types';

import getListItemsInRange from './getListItemsInRange';
import listItemContainsText from './listItemContainsText';

/**
 * Returns true when editor has collapsed selection and the cursor is in an empty "list-item".
 */
const isCursorInEmptyListItem = (options: ListsOptions, editor: Editor): boolean => {
    if (!editor.selection || Range.isExpanded(editor.selection)) {
        return false;
    }

    const listItemsInSelection = getListItemsInRange(options, editor, editor.selection);

    if (listItemsInSelection.length !== 1) {
        return false;
    }

    const [[listItemNode]] = listItemsInSelection;

    return !listItemContainsText(options, editor, listItemNode);
};

export default isCursorInEmptyListItem;
