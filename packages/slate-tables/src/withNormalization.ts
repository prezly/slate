import * as normalization from './normalization';
import type { TablesEditor } from './TablesEditor';

const normalizers = [
    normalization.removeEmptyRows,
    normalization.splitRowSpanCells,
    normalization.splitColSpanCells,
    normalization.insertMissingCells,
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
