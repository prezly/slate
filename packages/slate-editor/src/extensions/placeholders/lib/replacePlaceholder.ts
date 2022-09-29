import { type Element, Editor, Transforms } from 'slate';

import { PlaceholderNode } from '../PlaceholderNode';

export function replacePlaceholder(
    editor: Editor,
    placeholder: Pick<PlaceholderNode, 'type' | 'uuid'>,
    element: Element,
) {
    const { type, uuid } = placeholder;
    Editor.withoutNormalizing(editor, () => {
        Transforms.setNodes(editor, element, {
            at: [],
            match: (node) => PlaceholderNode.isPlaceholderNode(node, type) && node.uuid === uuid,
        });
    });
}
