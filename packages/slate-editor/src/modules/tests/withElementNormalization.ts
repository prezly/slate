import { ElementApi, type ElementEntry, type NodeEntry, type SlateEditor } from '@udecode/plate';

export function withElementNormalization(
    editor: SlateEditor,
    normalization: (entry: ElementEntry) => boolean,
) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry;
        if (ElementApi.isElement(node) && normalization([node, path])) {
            return;
        }

        normalizeNode(entry);
    };

    return editor;
}
