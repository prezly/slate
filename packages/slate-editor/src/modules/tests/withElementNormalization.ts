import type { Editor, ElementEntry, NodeEntry } from 'slate';
import { Element } from 'slate';

export function withElementNormalization(
    editor: Editor,
    normalization: (entry: ElementEntry) => boolean,
) {
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
