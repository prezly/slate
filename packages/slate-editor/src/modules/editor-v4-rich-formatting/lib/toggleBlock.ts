import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Transforms } from 'slate';

import lists from '../lists';
import { ElementType } from '../types';

const toggleBlock = (editor: Editor, type: string): void => {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return;
    }

    if ([ElementType.BULLETED_LIST as string, ElementType.NUMBERED_LIST as string].includes(type)) {
        lists.wrapInList(editor, type);
        lists.setListType(editor, type);
        return;
    }

    lists.unwrapList(editor);
    Transforms.setNodes(editor, { type });
};

export default toggleBlock;
