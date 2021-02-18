import { Editor, Transforms } from 'slate';

import { ListsOptions } from '../types';

import getListsInRange from './getListsInRange';

/**
 * Sets "type" of all "list" nodes in the current selection.
 */
const setListType = (options: ListsOptions, editor: Editor, listType: string): void => {
    if (!editor.selection) {
        return;
    }

    const listEntries = getListsInRange(options, editor, editor.selection);

    listEntries.forEach((listEntry) => {
        const [, listPath] = listEntry;
        Transforms.setNodes(editor, { type: listType }, { at: listPath });
    });
};

export default setListType;
