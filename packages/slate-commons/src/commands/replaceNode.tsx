import { isElementNode } from '@prezly/slate-types';
import type { Node, NodeMatch, Path } from 'slate';
import { Editor, Transforms } from 'slate';

import { replaceChildren } from './replaceChildren';

interface Options<T extends Node> {
    at?: Path;
    match: NodeMatch<T>;
    select?: boolean;
}

export function replaceNode<Original extends Node, New extends Node>(
    editor: Editor,
    options: Options<Original>,
    newNode: New,
) {
    const { at, match, select = false } = options;
    Editor.withoutNormalizing(editor, () => {
        for (const [node, path] of Editor.nodes(editor, { at, match })) {
            Transforms.unsetNodes<Original>(editor, Object.keys(node), { at: path });
            Transforms.setNodes<Original | New>(editor, newNode, { at: path });
            if (isElementNode(newNode)) {
                replaceChildren(editor, [node, path], newNode.children);
            }
            if (select) {
                Transforms.select(editor, path);
            }
            // exit after the fist iteration, otherwise there's risk that we'll plant
            // multiple instances of the same object into the document. Which is bad:
            // Slate is relying on referential equality and uniqueness internally.
            return;
        }
    });
}
