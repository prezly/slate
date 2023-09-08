import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Element } from 'slate';

import { PlaceholderNode } from '../PlaceholderNode';

interface Options {
    select?: boolean;
}

export function replacePlaceholder(
    editor: Editor,
    placeholder: Pick<PlaceholderNode, 'type' | 'uuid'>,
    element: Element,
    { select = false }: Options = {},
) {
    EditorCommands.replaceNode<PlaceholderNode, Element>(editor, element, {
        at: [],
        match: (node) =>
            PlaceholderNode.isPlaceholderNode(node, placeholder.type) &&
            node.uuid === placeholder.uuid,
        select,
    });
}
