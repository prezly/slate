import { Transforms } from 'slate';
import type { Text } from 'slate';
import type { Editor } from 'slate';

export function unsetMark<T extends Text>(editor: Editor, node: T, mark: keyof Omit<T, 'text'>) {
    if (node[mark]) {
        Transforms.unsetNodes<T>(editor, mark.toString(), {
            match: (n) => n === node,
        });

        return true;
    }

    return false;
}
