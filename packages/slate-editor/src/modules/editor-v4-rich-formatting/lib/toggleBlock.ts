import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { lists } from '../lists';
import { ElementType } from '../types';

export function toggleBlock<Block extends ElementNode>(editor: Editor, type: Block['type']): void {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return;
    }

    if (type === ElementType.BULLETED_LIST || type === ElementType.NUMBERED_LIST) {
        lists.wrapInList(editor, type);
        lists.setListType(editor, type);
        return;
    }

    lists.unwrapList(editor);
    Transforms.setNodes(editor, { type } as Partial<Block>);
}
