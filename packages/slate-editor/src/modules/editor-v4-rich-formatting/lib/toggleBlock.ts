import { EditorCommands } from '@prezly/slate-commons';
import { ElementNode } from '@prezly/slate-types';

import { Editor, Element, Transforms } from 'slate';
import lists from '../lists';
import { ElementType } from '../types';

const toggleBlock = (editor: Editor, type: ElementNode['type']): void => {
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
    Transforms.setNodes(editor, { type } as Partial<Element>);
};

export default toggleBlock;
