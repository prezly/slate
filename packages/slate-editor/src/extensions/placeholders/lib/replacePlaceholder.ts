import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Element } from 'slate';

import { PlaceholderNode } from '../PlaceholderNode';

export function replacePlaceholder(
    editor: Editor,
    placeholder: Pick<PlaceholderNode, 'type' | 'uuid'>,
    element: Element,
) {
    EditorCommands.replaceNode<PlaceholderNode, Element>(editor, element, {
        at: [],
        match: (node) =>
            PlaceholderNode.isPlaceholderNode(node, placeholder.type) &&
            node.uuid === placeholder.uuid,
    });
}
