import type { SlateEditor } from '@udecode/plate-common';
import { type NodeEntry, Node, Path } from 'slate';

export function getNextSibling(editor: SlateEditor, path: Path): NodeEntry | null {
    let nextSiblingPath: Path;

    try {
        nextSiblingPath = Path.next(path);
    } catch (error) {
        // Unable to calculate `Path.next`, which means there is no next sibling.
        return null;
    }

    if (Node.has(editor, nextSiblingPath)) {
        return [Node.get(editor, nextSiblingPath), nextSiblingPath];
    }

    return null;
}
