import { type Descendant, type EditorSelection, type SlateEditor } from '@udecode/plate';

import { fixSelection } from './isValidSelection';

/**
 * Based on the snippet from the Slate issue discussion:
 * @see https://github.com/ianstormtaylor/slate/pull/4540#issuecomment-951903419
 */
export function resetNodes(
    editor: SlateEditor,
    nodes: Descendant[],
    selection?: EditorSelection,
): void {
    const children = [...editor.children];

    editor.tf.withoutNormalizing(() => {
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            editor.tf.apply({ type: 'remove_node', path: [0], node });
        }

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            editor.tf.apply({ type: 'insert_node', path: [i], node });
        }

        if (selection) {
            editor.tf.select(fixSelection(editor, selection) ?? editor.api.end([]));
        }
    });
}
