import type { Editor, NodeEntry } from 'slate';
import { Node, Path } from 'slate';

function getPreviousSibling(editor: Editor, path: Path): NodeEntry<Node> | null {
    let previousSiblingPath: Path;

    try {
        previousSiblingPath = Path.previous(path);
    } catch (error) {
        // Unable to calculate `Path.previous`, which means there is no previous sibling.
        return null;
    }

    if (Node.has(editor, previousSiblingPath)) {
        return [Node.get(editor, previousSiblingPath), previousSiblingPath];
    }

    return null;
}

export default getPreviousSibling;
