import type { SlateEditor } from '@udecode/plate-common';
import type { Path } from 'slate';
import { Node, Text } from 'slate';

export type Edge = 'highest' | 'lowest';

export function findLeafPath(
    editor: SlateEditor,
    path: Path,
    edge: Edge = 'highest',
): Path | undefined {
    if (!Node.has(editor, path)) {
        return undefined;
    }

    const node = Node.get(editor, path);

    if (Text.isText(node)) {
        return path;
    }

    const [, nestedPath] = edge === 'highest' ? editor.first(path) : editor.last(path);

    return findLeafPath(editor, nestedPath);
}
