import { EditorCommands } from '@prezly/slate-commons';
import type { Element, SlateEditor } from '@udecode/plate';

import { PlaceholderNode } from '../PlaceholderNode';

interface Options {
    select?: boolean;
}

export function replacePlaceholder(
    editor: SlateEditor,
    placeholder: Pick<PlaceholderNode, 'type' | 'uuid'>,
    element: Element,
    { select = false }: Options = {},
) {
    EditorCommands.replaceNode(editor, element, {
        at: [],
        match: (node) =>
            PlaceholderNode.isPlaceholderNode(node, placeholder.type) &&
            node.uuid === placeholder.uuid,
        select,
    });
}
