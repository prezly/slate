import { EditorCommands } from '@prezly/slate-commons';
import { ListsEditor, ListType } from '@prezly/slate-lists';
import type { ElementNode } from '@prezly/slate-types';
import { BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function toggleBlock<T extends ElementNode>(editor: Editor, type: T['type']): void {
    const [currentNode, path] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return;
    }

    if (type === BULLETED_LIST_NODE_TYPE) {
        ListsEditor.wrapInList(editor, ListType.UNORDERED);
        ListsEditor.setListType(editor, ListType.UNORDERED);
        return;
    }

    if (type === NUMBERED_LIST_NODE_TYPE) {
        ListsEditor.wrapInList(editor, ListType.ORDERED);
        ListsEditor.setListType(editor, ListType.ORDERED);
        return;
    }

    ListsEditor.unwrapList(editor);

    if (path && EditorCommands.isCursorInEmptyParagraph(editor, { trim: true })) {
        EditorCommands.removeChildren(editor, [currentNode, path]);
    }

    Transforms.setNodes(editor, { type });
}
