import type { Editor, EditorNodesOptions, ElementOrTextOf, SlateEditor } from '@udecode/plate';

export function removeNode<T extends ElementOrTextOf<Editor>>(
    editor: SlateEditor,
    options: NonNullable<EditorNodesOptions>,
): T | null {
    const [nodeEntry] = editor.api.nodes(options);
    if (nodeEntry) {
        const [node, nodePath] = nodeEntry;
        editor.tf.removeNodes({ at: nodePath });
        return node;
    }
    return null;
}
