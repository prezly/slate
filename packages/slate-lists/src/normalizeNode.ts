import type { Editor, NodeEntry } from 'slate';

import { ListsEditor } from './ListsEditor';
import * as Normalizations from './normalizations';

/**
 * All plugin normalizations combined into a single function.
 */
export function normalizeNode(editor: Editor, entry: NodeEntry): boolean {
    if (ListsEditor.isListsEditor(editor)) {
        return (
            normalizeNode.normalizeListChildren(editor, entry) ||
            normalizeNode.normalizeListItemChildren(editor, entry) ||
            normalizeNode.normalizeListItemTextChildren(editor, entry) ||
            normalizeNode.normalizeOrphanListItem(editor, entry) ||
            normalizeNode.normalizeOrphanListItemText(editor, entry) ||
            normalizeNode.normalizeOrphanNestedList(editor, entry) ||
            normalizeNode.normalizeSiblingLists(editor, entry)
        );
    }
    return false;
}

export namespace normalizeNode {
    export const normalizeListChildren = Normalizations.normalizeListChildren;
    export const normalizeListItemChildren = Normalizations.normalizeListItemChildren;
    export const normalizeListItemTextChildren = Normalizations.normalizeListItemTextChildren;
    export const normalizeOrphanListItem = Normalizations.normalizeOrphanListItem;
    export const normalizeOrphanListItemText = Normalizations.normalizeOrphanListItemText;
    export const normalizeOrphanNestedList = Normalizations.normalizeOrphanNestedList;
    export const normalizeSiblingLists = Normalizations.normalizeSiblingLists;
}
