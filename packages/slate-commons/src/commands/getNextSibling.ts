import type { Editor, NodeEntry } from 'slate';
import { Node, Path } from 'slate';

export function getNextSibling(editor: Editor, path: Path): NodeEntry<Node> | null {
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
