import type { SlateEditor } from '@udecode/plate-common';
import type { Path } from 'slate';

export function getNodePath(
    editor: SlateEditor,
    options: NonNullable<Parameters<typeof editor.nodes>[0]>,
): Path | null {
    const [entry] = editor.nodes(options);
    return entry ? entry[1] : null;
}
