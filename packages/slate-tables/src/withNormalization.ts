import * as TablesNormalization from './normalization';
import type { TablesEditor } from './TablesEditor';

const normalizers = [
    TablesNormalization.removeEmptyRows,
    TablesNormalization.splitRowSpanCells,
    TablesNormalization.splitColSpanCells,
    TablesNormalization.insertMissingCells,
];

export function withNormalization(editor: TablesEditor) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const [, path] = entry;

        for (const normalize of normalizers) {
            const changed = normalize(editor, path);

            if (changed) {
                return;
            }
        }

        normalizeNode(entry);
    };

    return editor;
}
