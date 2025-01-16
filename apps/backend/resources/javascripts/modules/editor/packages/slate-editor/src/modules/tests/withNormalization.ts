import type { SlateEditor, TNodeEntry } from '@udecode/plate-common';

export function withNormalization(
    editor: SlateEditor,
    normalization: (entry: TNodeEntry) => boolean,
) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry: TNodeEntry) => {
        if (normalization(entry)) {
            return;
        }

        normalizeNode(entry);
    };

    return editor;
}
