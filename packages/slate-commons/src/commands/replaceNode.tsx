import { isElementNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Node, NodeMatch, Path } from 'slate';

import { replaceChildren } from './replaceChildren';

interface Options<T extends Node> {
    at?: Path;
    match: NodeMatch<T>;
    select?: boolean;
}

export function replaceNode<Original extends Node, New extends Node>(
    editor: SlateEditor,
    newNode: New,
    options: Options<Original>,
) {
    const { at, match, select = false } = options;
    editor.withoutNormalizing(() => {
        const [entry] = editor.nodes({ at, match, mode: 'highest' });

        if (entry) {
            const [node, path] = entry;

            editor.unsetNodes(Object.keys(node), { at: path });
            editor.setNodes<Original | New>(newNode, { at: path });
            if (isElementNode(newNode)) {
                replaceChildren(editor, [node, path], newNode.children);
            }
            if (select) {
                editor.select(path);
            }
        }
    });
}
