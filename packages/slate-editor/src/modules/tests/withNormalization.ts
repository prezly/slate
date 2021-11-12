import { Editor, NodeEntry } from 'slate';

export function withNormalization(editor: Editor, normalization: (entry: NodeEntry) => boolean) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry: NodeEntry) => {
        if (normalization(entry)) {
            return;
        }

        normalizeNode(entry);
    };

    return editor;
}