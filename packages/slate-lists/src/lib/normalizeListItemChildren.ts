import { Editor, Element, Node, NodeEntry, Text, Transforms } from 'slate';

import { ListsOptions } from '../types';

import createListItem from './createListItem';
import createListItemText from './createListItemText';
import isList from './isList';
import isListItem from './isListItem';
import isListItemText from './isListItemText';

/**
 * A "list-item" can have a single "list-item-text" and optionally an extra "list" as a child.
 */
const normalizeListItemChildren = (
    options: ListsOptions,
    editor: Editor,
    [node, path]: NodeEntry<Node>,
): boolean => {
    if (!isListItem(options, node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const children = Array.from(Node.children(editor, path));

    for (let childIndex = 0; childIndex < children.length; ++childIndex) {
        const [childNode, childPath] = children[childIndex];

        if (Text.isText(childNode) || editor.isInline(childNode)) {
            const listItemText = createListItemText(options, [childNode]);
            Transforms.wrapNodes(editor, listItemText, { at: childPath });

            if (childIndex > 0) {
                const [previousChildNode] = children[childIndex - 1];

                if (isListItemText(options, previousChildNode)) {
                    Transforms.mergeNodes(editor, { at: childPath });
                }
            }

            return true;
        }

        // Casting `as Element` here, because of TypeScript incorrectly complaining that `childNode`
        // is of type `never`, even though we just checked if it's an `Element`.
        if (Element.isElement(childNode) && typeof (childNode as Element).type === 'undefined') {
            // It can happen during pasting that the `type` attribute will be missing.
            Transforms.setNodes(
                editor,
                { type: options.listItemTextType as Element['type'] },
                { at: childPath },
            );
            return true;
        }

        if (isListItem(options, childNode)) {
            Transforms.liftNodes(editor, { at: childPath });
            return true;
        }

        if (isListItemText(options, childNode) && childIndex !== 0) {
            Transforms.wrapNodes(editor, createListItem(options), { at: childPath });
            return true;
        }

        if (!isListItemText(options, childNode) && !isList(options, childNode)) {
            Transforms.setNodes(
                editor,
                { type: options.listItemTextType as Element['type'] },
                { at: childPath },
            );
            return true;
        }
    }

    return false;
};

export default normalizeListItemChildren;
