import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import type { Editor, Element, Node, NodeEntry } from 'slate';

const disallowParentLink = (parent: Element) => !isLinkNode(parent);

export function normalizeNestedLink(editor: Editor, [node, path]: NodeEntry<Node>): boolean {
    if (!isLinkNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    return EditorCommands.normalizeNestedElement(editor, [node, path], disallowParentLink);
}
