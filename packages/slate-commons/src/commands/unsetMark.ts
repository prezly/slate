import type { NodeEntry, SlateEditor, Text } from '@udecode/plate';

export function unsetMark<T extends Text>(
    editor: SlateEditor,
    entry: NodeEntry<T>,
    mark: keyof Omit<T, 'text'>,
) {
    const [node, path] = entry;

    if (node[mark]) {
        editor.tf.unsetNodes(mark.toString(), {
            at: path,
            match: (n) => n === node,
        });

        return true;
    }

    return false;
}
