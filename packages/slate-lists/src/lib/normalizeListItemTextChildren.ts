import { Editor, Element, Node, NodeEntry, Transforms } from 'slate';

import { ListsOptions } from '../types';

import isListItemText from './isListItemText';

/**
 * A "list-item-text" can have only inline nodes in it.
 */
const normalizeListItemTextChildren = (
    options: ListsOptions,
    editor: Editor,
    [node, path]: NodeEntry<Node>,
): boolean => {
    if (!isListItemText(options, node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    for (const [childNode, childPath] of Node.children(editor, path)) {
        if (Element.isElement(childNode) && !Editor.isInline(editor, childNode)) {
            Transforms.unwrapNodes(editor, { at: childPath });
            return true;
        }
    }

    return false;
};

export default normalizeListItemTextChildren;
