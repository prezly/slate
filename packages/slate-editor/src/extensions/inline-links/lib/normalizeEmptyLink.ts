import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Node, NodeEntry } from 'slate';

export function normalizeEmptyLink(editor: SlateEditor, [node, path]: NodeEntry<Node>): boolean {
    if (!isLinkNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    if (EditorCommands.isNodeEmpty(editor, node) || !node.href) {
        editor.removeNodes({ at: path });
        return true;
    }

    return false;
}
