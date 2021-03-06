import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Range } from 'slate';

import { ListsOptions } from '../types';

import getListItemsInRange from './getListItemsInRange';

/**
 * Returns true when editor has collapsed selection and the cursor is at the beginning of a "list-item".
 */
const isCursorAtStartOfListItem = (options: ListsOptions, editor: Editor): boolean => {
    if (!editor.selection || Range.isExpanded(editor.selection)) {
        return false;
    }

    const listItemsInSelection = getListItemsInRange(options, editor, editor.selection);

    if (listItemsInSelection.length !== 1) {
        return false;
    }

    const [[, listItemPath]] = listItemsInSelection;
    const { isStart } = EditorCommands.getCursorPositionInNode(
        editor,
        editor.selection.anchor,
        listItemPath,
    );

    return isStart;
};

export default isCursorAtStartOfListItem;
