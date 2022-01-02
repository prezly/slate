import { EditorCommands } from '@prezly/slate-commons';
import { isElementNode } from '@prezly/slate-types';
import type { Node, NodeEntry } from 'slate';
import { Editor, Element, Transforms } from 'slate';

import type { ListsOptions } from '../types';

import { isList } from './isList';

/**
 * A "list" can have no parent (be at the root) or have a "list-item" parent (nested list).
 * In any other case we will try to unwrap it, or lift it up.
 */
export function normalizeList(
    options: ListsOptions,
    editor: Editor,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!isList(options, node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const ancestor = Editor.above(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if (
        isElementNode(ancestorNode) &&
        [...options.listTypes, options.listItemType].includes(ancestorNode.type)
    ) {
        return false;
    }

    if (ancestorNode.children.length === 1) {
        Transforms.unwrapNodes(editor, { at: ancestorPath, voids: true });
    } else {
        Transforms.liftNodes(editor, { at: path, voids: true });
    }

    EditorCommands.makeDirty(editor, ancestorPath);

    return true;
}
