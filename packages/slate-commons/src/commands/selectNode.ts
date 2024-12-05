import type { SlateEditor } from '@udecode/plate-common';
import { type Node } from 'slate';

export function selectNode(editor: SlateEditor, node: Node): void {
    const [entry] = editor.nodes({
        at: [],
        match: (n) => n === node,
    });

    if (entry) {
        editor.select(entry[1]);
    }
}
