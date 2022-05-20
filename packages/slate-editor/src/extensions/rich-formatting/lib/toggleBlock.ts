import { EditorCommands } from '@prezly/slate-commons';
import { Lists, ListType } from '@prezly/slate-lists';
import type { ElementNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { ElementType } from '../types';

export function toggleBlock<T extends ElementNode>(editor: Editor, type: T['type']): void {
    const [currentNode, path] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return;
    }

    if (type === ElementType.BULLETED_LIST) {
        Lists.wrapInList(editor, ListType.UNORDERED);
        Lists.setListType(editor, ListType.UNORDERED);
        return;
    }

    if (type === ElementType.NUMBERED_LIST) {
        Lists.wrapInList(editor, ListType.ORDERED);
        Lists.setListType(editor, ListType.ORDERED);
        return;
    }

    Lists.unwrapList(editor);

    if (path && EditorCommands.isCursorInEmptyParagraph(editor, { trim: true })) {
        EditorCommands.removeChildren(editor, [currentNode, path]);
    }

    Transforms.setNodes(editor, { type });
}
