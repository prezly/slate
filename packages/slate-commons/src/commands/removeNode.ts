import type { Node, SlateEditor } from '@udecode/plate';

export function removeNode(
    editor: SlateEditor,
    options: NonNullable<Parameters<typeof editor.api.nodes>[0]>,
): Node | null {
    const [nodeEntry] = editor.api.nodes(options);
    if (nodeEntry) {
        const [node, nodePath] = nodeEntry;
        editor.tf.removeNodes({ at: nodePath });
        return node;
    }
    return null;
}
