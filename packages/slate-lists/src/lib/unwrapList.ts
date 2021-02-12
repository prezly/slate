import { Editor } from 'slate';

import { ListsOptions } from '../types';

import decreaseDepth from './decreaseDepth';
import getListItemsInRange from './getListItemsInRange';

const unwrapList = (options: ListsOptions, editor: Editor): void => {
    while (getListItemsInRange(options, editor, editor.selection).length > 0) {
        decreaseDepth(options, editor);
    }
};

export default unwrapList;
