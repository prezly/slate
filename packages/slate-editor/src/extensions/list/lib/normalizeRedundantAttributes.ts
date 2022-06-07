import { EditorCommands } from '@prezly/slate-commons';
import type { ListItemNode, ListItemTextNode, ListNode } from '@prezly/slate-types';
import { isListItemNode, isListItemTextNode, isListNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const LIST_SHAPE: Record<keyof ListNode, true> = {
    type: true,
    align: true,
    children: true,
};

const LIST_ITEM_SHAPE: Record<keyof ListItemNode, true> = {
    type: true,
    children: true,
};

const LIST_ITEM_TEXT_SHAPE: Record<keyof ListItemTextNode, true> = {
    type: true,
    children: true,
};

const ALLOWED_LIST_ATTRIBUTES = Object.keys(LIST_SHAPE);
const ALLOWED_LIST_ITEM_ATTRIBUTES = Object.keys(LIST_ITEM_SHAPE);
const ALLOWED_LIST_ITEM_TEXT_ATTRIBUTES = Object.keys(LIST_ITEM_TEXT_SHAPE);

export function normalizeRedundantAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (isListNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_LIST_ATTRIBUTES,
        );
    }
    if (isListItemNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_LIST_ITEM_ATTRIBUTES,
        );
    }
    if (isListItemTextNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_LIST_ITEM_TEXT_ATTRIBUTES,
        );
    }

    return false;
}
