import { NodeApi, type Path, type SlateEditor, TextApi } from '@udecode/plate';

export type Edge = 'highest' | 'lowest';

export function findLeafPath(
    editor: SlateEditor,
    path: Path,
    edge: Edge = 'highest',
): Path | undefined {
    if (!NodeApi.has(editor, path)) {
        return undefined;
    }

    const node = NodeApi.get(editor, path);

    if (TextApi.isText(node)) {
        return path;
    }

    const result = edge === 'highest' ? editor.api.first(path) : editor.api.last(path);
    if (!result) {
        return undefined;
    }

    const [, nestedPath] = result;
    return findLeafPath(editor, nestedPath);
}
