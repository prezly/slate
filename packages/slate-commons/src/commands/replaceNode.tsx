import { isElementNode } from '@prezly/slate-types';
import type { Node, Path, QueryOptions, SlateEditor } from '@udecode/plate';

import { replaceChildren } from './replaceChildren';

interface Options {
    at?: Path;
    match: QueryOptions['match'];
    select?: boolean;
}

export function replaceNode(
    editor: SlateEditor,
    newNode: Node,
    options: Options,
) {
    const { at, match, select = false } = options;
    editor.tf.withoutNormalizing(() => {
        const [entry] = editor.api.nodes({ at, match, mode: 'highest' });

        if (entry) {
            const [node, path] = entry;

            editor.tf.unsetNodes(Object.keys(node), { at: path });
            editor.tf.setNodes(newNode, { at: path, match });
            if (isElementNode(newNode)) {
                replaceChildren(editor, [node, path], newNode.children);
            }
            if (select) {
                editor.tf.select(path);
            }
        }
    });
}
