import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

export function normalizeEmptyLink(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!isLinkNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    if (EditorCommands.isNodeEmpty(editor, node) || !node.href) {
        editor.tf.removeNodes({ at: path });
        return true;
    }

    return false;
}
