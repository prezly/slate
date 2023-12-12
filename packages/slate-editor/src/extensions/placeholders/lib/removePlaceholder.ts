import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { PlaceholderNode } from '../PlaceholderNode';

export function removePlaceholder(editor: Editor, placeholder: PlaceholderNode): void {
    Transforms.removeNodes(editor, {
        match: (node) =>
            PlaceholderNode.isPlaceholderNode(node) &&
            node.type === placeholder.type &&
            node.uuid === placeholder.uuid,
    });
}
