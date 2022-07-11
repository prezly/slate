import { Transforms } from 'slate';
import type { Text, NodeEntry } from 'slate';
import type { Editor } from 'slate';

export function unsetMark<T extends Text>(
    editor: Editor,
    entry: NodeEntry<T>,
    mark: keyof Omit<T, 'text'>,
) {
    const [node, path] = entry;

    if (node[mark]) {
        Transforms.unsetNodes<T>(editor, mark.toString(), {
            at: path,
            match: (n) => n === node,
        });

        return true;
    }

    return false;
}
