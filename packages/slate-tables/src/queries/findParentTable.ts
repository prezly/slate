import { type Location, type NodeEntry, type Selection } from 'slate';

import type { TableNode } from '../nodes';
import type { TablesEditor } from '../TablesEditor';

export function findParentTable<T extends TableNode>(
    editor: TablesEditor,
    location: Location | Selection = editor.selection,
): NodeEntry<T> | undefined {
    if (!location) {
        return undefined;
    }
    for (const entry of editor.levels({ at: location })) {
        if (editor.isTableNode(entry[0])) {
            return entry as NodeEntry<T>;
        }
    }

    return undefined;
}
