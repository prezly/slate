import { Editor, Node } from 'slate';

import { ListsOptions } from '../types';

import isListItem from './isListItem';
import isListItemText from './isListItemText';

const listItemContainsText = (options: ListsOptions, editor: Editor, node: Node): boolean => {
    if (!isListItem(options, node)) {
        return false;
    }

    const [listItemText] = node.children;

    if (!isListItemText(options, listItemText)) {
        return false;
    }

    return !Editor.isEmpty(editor, listItemText);
};

export default listItemContainsText;
