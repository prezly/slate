import { type Node, Editor, Transforms } from 'slate';

export function selectNode(editor: Editor, node: Node): void {
    const [entry] = Editor.nodes(editor, {
        at: [],
        match: (n) => n === node,
    });

    if (entry) {
        Transforms.select(editor, entry[1]);
    }
}
