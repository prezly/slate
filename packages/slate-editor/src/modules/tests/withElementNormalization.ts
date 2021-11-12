import { Editor, Element, ElementEntry, NodeEntry } from 'slate';

export function withElementNormalization(editor: Editor, normalization: (entry: ElementEntry) => boolean) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry;
        if (Element.isElement(node) && normalization([node, path])) {
            return;
        }

        normalizeNode(entry);
    };

    return editor;
}