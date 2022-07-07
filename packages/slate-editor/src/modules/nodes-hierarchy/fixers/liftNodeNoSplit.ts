import { Editor, Element, Path, Transforms } from 'slate';
import type { NodeEntry } from 'slate';

/**
 * This fixer just moves node up, without parent node splitting
 */
export function liftNodeNoSplit(editor: Editor, [, path]: NodeEntry) {
    const ancestor = Editor.above(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    Transforms.moveNodes(editor, { at: path, to: Path.parent(path), voids: true });

    return true;
}
