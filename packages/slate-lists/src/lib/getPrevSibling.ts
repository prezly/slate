import { NodeApi, type NodeEntry, type Path, PathApi, type SlateEditor } from '@udecode/plate';

export function getPrevSibling(editor: SlateEditor, path: Path): NodeEntry | null {
    const previousSiblingPath = PathApi.previous(path);
    if (!previousSiblingPath) {
        return null;
    }

    const previousSibling = NodeApi.get(editor, previousSiblingPath);
    if (previousSibling) {
        return [previousSibling, previousSiblingPath];
    }

    return null;
}
