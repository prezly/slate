import type { SlateEditor } from '@udecode/plate-common';
import type { Node } from 'slate';

export function removeNode<N extends Node>(
    editor: SlateEditor,
    options: NonNullable<Parameters<typeof editor.nodes>[0]>,
): N | null {
    const [nodeEntry] = editor.nodes<N>(options);
    if (nodeEntry) {
        const [node, nodePath] = nodeEntry;
        editor.removeNodes({ at: nodePath });
        return node;
    }
    return null;
}
