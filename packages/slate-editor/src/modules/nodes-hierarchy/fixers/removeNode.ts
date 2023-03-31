import { Editor, Element, Path, Transforms } from 'slate';
import type { NodeEntry } from 'slate';

export function removeNode(editor: Editor, [, path]: NodeEntry) {
    const targetPath = Path.parent(path);
    const ancestor = Editor.above(editor, { at: targetPath });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    Transforms.removeNodes(editor, { at: targetPath, voids: true });

    return true;
}
