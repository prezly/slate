import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms, Node } from 'slate';

import { lists } from '../lists';
import { ElementType } from '../types';

export function toggleBlock<Block extends ElementNode>(editor: Editor, type: Block['type']): void {
    const [currentNode, path] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return;
    }

    if (type === ElementType.BULLETED_LIST || type === ElementType.NUMBERED_LIST) {
        lists.wrapInList(editor, type);
        lists.setListType(editor, type);
        return;
    }

    lists.unwrapList(editor);

    const text = Node.string(currentNode);

    if (text.length && text.trim() === '' && path) {
        EditorCommands.removeChildren(editor, [currentNode, path]);
    }

    Transforms.setNodes(editor, { type } as Partial<Block>);
}
