import { EditorCommands } from '@prezly/slate-commons';
import type { Node, NodeEntry, SlateEditor } from '@udecode/plate';

import { ButtonBlockNode } from '../ButtonBlockNode';

const shape: Record<keyof ButtonBlockNode, true> = {
    type: true,
    href: true,
    new_tab: true,
    children: true,
    layout: true,
    variant: true,
    label: true,
    uuid: true,
};

const ALLOWED_BUTTON_BLOCK_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantButtonBlockAttributes(
    editor: SlateEditor,
    [node, path]: NodeEntry<Node>,
) {
    if (ButtonBlockNode.isButtonBlockNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_BUTTON_BLOCK_ATTRIBUTES,
        );
    }

    return false;
}
