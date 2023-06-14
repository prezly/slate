import type { Editor, NodeEntry } from 'slate';

import { ListsEditor } from '../ListsEditor';

import { normalizeListChildren } from './normalizeListChildren';
import { normalizeListItemChildren } from './normalizeListItemChildren';
import { normalizeListItemTextChildren } from './normalizeListItemTextChildren';
import { normalizeOrphanListItem } from './normalizeOrphanListItem';
import { normalizeOrphanListItemText } from './normalizeOrphanListItemText';
import { normalizeOrphanNestedList } from './normalizeOrphanNestedList';
import { normalizeSiblingLists } from './normalizeSiblingLists';

/**
 * All plugin normalizations combined into a single function.
 */
export function normalizeNode(editor: Editor, entry: NodeEntry): boolean {
    if (ListsEditor.isListsEditor(editor)) {
        return (
            normalizeListChildren(editor, entry) ||
            normalizeListItemChildren(editor, entry) ||
            normalizeListItemTextChildren(editor, entry) ||
            normalizeOrphanListItem(editor, entry) ||
            normalizeOrphanListItemText(editor, entry) ||
            normalizeOrphanNestedList(editor, entry) ||
            normalizeSiblingLists(editor, entry)
        );
    }
    return false;
}
