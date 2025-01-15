import type { Node, SlateEditor } from '@udecode/plate';

export function selectNode(editor: SlateEditor, node: Node): void {
    const [entry] = editor.api.nodes({
        at: [],
        match: (n) => n === node,
    });

    if (entry) {
        editor.tf.select(entry[1]);
    }
}
