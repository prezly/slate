import { EditorCommands } from '@prezly/slate-commons';
import { type Element, Editor, Transforms } from 'slate';

import { PlaceholderNode } from '../PlaceholderNode';

export function replacePlaceholder(
    editor: Editor,
    placeholder: Pick<PlaceholderNode, 'type' | 'uuid'>,
    element: Element,
) {
    const { type, uuid } = placeholder;

    Editor.withoutNormalizing(editor, () => {
        const targets = Editor.nodes<PlaceholderNode>(editor, {
            at: [],
            match: (node) => PlaceholderNode.isPlaceholderNode(node, type) && node.uuid === uuid,
        });

        for (const [node, path] of targets) {
            Transforms.setNodes(editor, element, { at: path });
            EditorCommands.replaceChildren(editor, [node, path], element.children);
        }
    });
}
