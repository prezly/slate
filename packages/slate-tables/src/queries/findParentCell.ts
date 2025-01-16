import { type EditorSelection, type Location, type NodeEntry } from '@udecode/plate';

import type { TableCellNode } from '../nodes';
import type { TablesEditor } from '../TablesEditor';

export function findParentCell<T extends TableCellNode>(
    editor: TablesEditor,
    location: Location | EditorSelection = editor.selection,
): NodeEntry<T> | undefined {
    if (!location) return undefined;
    for (const entry of editor.api.levels({ at: location })) {
        if (editor.isTableCellNode(entry[0])) {
            return entry as NodeEntry<T>;
        }
    }

    return undefined;
}
