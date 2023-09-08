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
    newNode: New,
    options: Options<Original>,
) {
    const { at, match, select = false } = options;
    Editor.withoutNormalizing(editor, () => {
        const [entry] = Editor.nodes(editor, { at, match, mode: 'highest' });

        if (entry) {
            const [node, path] = entry;

            Transforms.unsetNodes<Original>(editor, Object.keys(node), { at: path });
            Transforms.setNodes<Original | New>(editor, newNode, { at: path });
            if (isElementNode(newNode)) {
                replaceChildren(editor, [node, path], newNode.children);
            }
            if (select) {
                Transforms.select(editor, path);
            }
        }
    });
}
