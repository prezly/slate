import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import { Editor, Node, NodeEntry, Transforms } from 'slate';

const normalizeEmptyLink = (editor: Editor, [node, path]: NodeEntry<Node>): boolean => {
    if (!isLinkNode(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    if (EditorCommands.isNodeEmpty(editor, node) || !node.href) {
        Transforms.removeNodes(editor, { at: path });
        return true;
    }

    return false;
};

export default normalizeEmptyLink;
