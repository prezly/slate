import { NodeApi, type NodeEntry, type Path, PathApi, type SlateEditor } from '@udecode/plate';

export function getNextSibling(editor: SlateEditor, path: Path): NodeEntry | null {
    let nextSiblingPath: Path;

    try {
        nextSiblingPath = PathApi.next(path);
    } catch (error) {
        // Unable to calculate `Path.next`, which means there is no next sibling.
        return null;
    }

    const nextSibling = NodeApi.get(editor, nextSiblingPath);
    if (nextSibling) {
        return [nextSibling, nextSiblingPath];
    }

    return null;
}
