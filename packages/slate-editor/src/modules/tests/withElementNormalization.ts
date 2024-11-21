import {
    isElement,
    type SlateEditor,
    type TElementEntry,
    type TNodeEntry,
} from '@udecode/plate-common';

export function withElementNormalization(
    editor: SlateEditor,
    normalization: (entry: TElementEntry) => boolean,
) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry: TNodeEntry) => {
        const [node, path] = entry;
        if (isElement(node) && normalization([node, path])) {
            return;
        }

        normalizeNode(entry);
    };

    return editor;
}
