import type { Path } from 'slate';
import { Editor } from 'slate';
import { Node, Text } from 'slate';

export type Edge = 'highest' | 'lowest';

export function findLeafPath(editor: Editor, path: Path, edge: Edge = 'highest'): Path | null {
    if (!Node.has(editor, path)) {
        return null;
    }

    const node = Node.get(editor, path);

    if (Text.isText(node)) {
        return path;
    }

    const [, nestedPath] =
        edge === 'highest' ? Editor.first(editor, path) : Editor.last(editor, path);

    return findLeafPath(editor, nestedPath);
}
