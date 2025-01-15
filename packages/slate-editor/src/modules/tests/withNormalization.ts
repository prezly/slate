import type { NodeEntry, SlateEditor } from '@udecode/plate';

export function withNormalization(
    editor: SlateEditor,
    normalization: (entry: NodeEntry) => boolean,
) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry: NodeEntry) => {
        if (normalization(entry)) {
            return;
        }

        normalizeNode(entry);
    };

    return editor;
}
