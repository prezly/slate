import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Node, NodeEntry, Transforms } from 'slate';

import isLinkElement from './isLinkElement';

const normalizeEmptyLink = (editor: Editor, [node, path]: NodeEntry<Node>): boolean => {
    if (!isLinkElement(node)) {
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
