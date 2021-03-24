import { Editor, Node, NodeEntry, Text, Transforms } from 'slate';

import isImageElement from './isImageElement';

/**
 * When pasting an image copied from the editor, `children` gets messed up for some reason,
 * having multiple Text objects, some of which are deeply nested inside other extra objects.
 * When unwrapped, those Text objects are merged into one.
 */
const normalizeChildren = (editor: Editor, [node, path]: NodeEntry<Node>): boolean => {
    if (!isImageElement(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    for (const [childNode, childPath] of Node.children(editor, path)) {
        if (!Text.isText(childNode)) {
            Transforms.unwrapNodes(editor, { at: childPath });
            return true;
        }
    }

    return false;
};

export default normalizeChildren;
