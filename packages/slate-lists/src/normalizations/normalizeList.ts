import { EditorCommands } from '@prezly/slate-commons';
import type { Node, NodeEntry } from 'slate';
import { Editor, Element, Transforms } from 'slate';

import type { ListsEditor } from '../types';

/**
 * A "list" can have no parent (be at the root) or have a "list-item" parent (nested list).
 * In any other case we will try to unwrap it, or lift it up.
 */
export function normalizeList(editor: ListsEditor, [node, path]: NodeEntry<Node>): boolean {
    if (!editor.isListNode(node)) {
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

    if (editor.isListNode(ancestorNode) || editor.isListItemNode(ancestorNode)) {
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
