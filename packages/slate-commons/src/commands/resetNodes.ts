import type { SlateEditor } from '@udecode/plate-common';
import type { Node, Selection } from 'slate';

import { fixSelection } from './isValidSelection';

/**
 * Based on the snippet from the Slate issue discussion:
 * @see https://github.com/ianstormtaylor/slate/pull/4540#issuecomment-951903419
 */
export function resetNodes(editor: SlateEditor, nodes: Node[], selection?: Selection): void {
    const children = [...editor.children];

    editor.withoutNormalizing(() => {
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            editor.apply({ type: 'remove_node', path: [0], node });
        }

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            // @ts-expect-error TODO: Tix this
            editor.apply({ type: 'insert_node', path: [i], node });
        }

        if (selection) {
            editor.select(fixSelection(editor, selection) ?? editor.end([]));
        }
    });
}
