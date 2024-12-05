import type { SlateEditor } from '@udecode/plate-common';
import type { Text, NodeEntry } from 'slate';

export function unsetMark<T extends Text>(
    editor: SlateEditor,
    entry: NodeEntry<T>,
    mark: keyof Omit<T, 'text'>,
) {
    const [node, path] = entry;

    if (node[mark]) {
        editor.unsetNodes(mark.toString(), {
            at: path,
            match: (n) => n === node,
        });

        return true;
    }

    return false;
}
