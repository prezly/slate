import { type Editor } from '@udecode/plate';

import { PlaceholderNode } from '../PlaceholderNode';

export function removePlaceholder(editor: Editor, placeholder: PlaceholderNode): void {
    editor.tf.removeNodes({
        match: (node) =>
            PlaceholderNode.isPlaceholderNode(node) &&
            node.type === placeholder.type &&
            node.uuid === placeholder.uuid,
    });
}
