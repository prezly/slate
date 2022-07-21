import type { Location, NodeEntry } from 'slate';
import { Editor } from 'slate';

import type { TableNode } from '../nodes';
import type { TablesEditor } from '../TablesEditor';

export function findParentTable<T extends TableNode>(
    editor: TablesEditor,
    location: Location | null = editor.selection,
): NodeEntry<T> | undefined {
    if (!location) {
        return undefined;
    }
    for (const entry of Editor.levels(editor, { at: location })) {
        if (editor.isTableNode(entry[0])) {
            return entry as NodeEntry<T>;
        }
    }

    return undefined;
}
