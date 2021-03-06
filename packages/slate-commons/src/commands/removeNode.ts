import { Editor, Node, Transforms } from 'slate';

const removeNode = <N extends Node>(
    editor: Editor,
    options: NonNullable<Parameters<typeof Editor.nodes>[1]>,
): N | null => {
    const [nodeEntry] = Editor.nodes<N>(editor, options);
    if (nodeEntry) {
        const [node, nodePath] = nodeEntry;
        Transforms.removeNodes(editor, { at: nodePath });
        return node;
    }
    return null;
};

export default removeNode;
