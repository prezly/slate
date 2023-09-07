import type { Path } from 'slate';
import { Editor } from 'slate';

export function getNodePath(
    editor: Editor,
    options: NonNullable<Parameters<typeof Editor.nodes>[1]>,
): Path | null {
    const [entry] = Editor.nodes(editor, options);
    return entry ? entry[1] : null;
}
