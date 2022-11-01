import { Editor, Transforms } from 'slate';
import type { NodeMatch, Node, NodeEntry } from 'slate';

interface Props<T extends Node> {
    entry: NodeEntry<T>;
    match: NodeMatch<T>;
}

export function replaceNode<Original extends Node, New extends Node>(
    editor: Editor,
    props: Props<Original>,
    createNode: () => New,
) {
    Editor.withoutNormalizing(editor, () => {
        const [node, path] = props.entry;

        Transforms.unsetNodes<Original>(editor, Object.keys(node), {
            at: path,
            match: props.match,
        });

        Transforms.setNodes<Original | New>(editor, createNode(), {
            at: path,
            match: props.match,
        });
    });
}
