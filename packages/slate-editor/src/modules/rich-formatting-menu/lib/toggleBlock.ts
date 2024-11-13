import { EditorCommands } from '@prezly/slate-commons';
import { ListsEditor, ListType } from '@prezly/slate-lists';
import type { ElementNode } from '@prezly/slate-types';
import { BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import type { PlateEditor } from '@udecode/plate-common/react';
import { Transforms } from 'slate';

export function toggleBlock<T extends ElementNode>(
    editor: PlateEditor,
    type: T['type'],
    props: Partial<Omit<ElementNode, 'children' | 'type'>> = {},
): void {
    const [currentNode, path] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return;
    }

    if (type === BULLETED_LIST_NODE_TYPE && ListsEditor.isListsEnabled(editor)) {
        ListsEditor.wrapInList(editor, ListType.UNORDERED);
        ListsEditor.setListType(editor, ListType.UNORDERED);
        return;
    }

    if (type === NUMBERED_LIST_NODE_TYPE && ListsEditor.isListsEnabled(editor)) {
        ListsEditor.wrapInList(editor, ListType.ORDERED);
        ListsEditor.setListType(editor, ListType.ORDERED);
        return;
    }

    if (ListsEditor.isListsEnabled(editor)) {
        ListsEditor.unwrapList(editor);
    }

    if (path && EditorCommands.isCursorInEmptyParagraph(editor, { trim: true })) {
        EditorCommands.removeChildren(editor, [currentNode, path]);
    }

    Transforms.setNodes(editor, { ...props, type });
}
