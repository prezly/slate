import { Editor, Transforms } from 'slate';
import type { NodeMatch, Node, NodeEntry } from 'slate';

interface Props<T extends Node> {
    entry: NodeEntry<T>;
    match: NodeMatch<T>;
}

export function replaceNode<Original extends Node, New extends Node>(
    editor: Editor,
    options: Props<Original>,
    newNode: New,
) {
    Editor.withoutNormalizing(editor, () => {
        const [node, path] = options.entry;

        Transforms.unsetNodes<Original>(editor, Object.keys(node), {
            at: path,
            match: options.match,
        });

        Transforms.setNodes<Original | New>(editor, newNode, {
            at: path,
            match: options.match,
        });
    });
}
