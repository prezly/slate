import {
    type Node,
    type NodeEntry,
    PathApi,
    TextApi,
    type SlateEditor,
    type Path,
    NodeApi,
} from '@udecode/plate';

export function wrapSiblingTextNodesIntoParagraph(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!TextApi.isText(node)) return false;
    if (path.length === 0) return false;

    const combinePaths = [path, ...collectNextSiblingsWhileMatching(editor, path, TextApi.isText)];

    const from = combinePaths[0];
    const to = combinePaths[combinePaths.length - 1];

    editor.tf.wrapNodes(editor.createDefaultTextBlock({ children: [] }), {
        at: PathApi.parent(path),
        match: betweenPaths(from, to),
    });

    return true;
}

function betweenPaths(from: Path, to: Path): (node: Node, path: Path) => boolean {
    return (_, path) => {
        return (
            PathApi.equals(path, from) ||
            PathApi.isAfter(path, from) ||
            PathApi.equals(path, to) ||
            PathApi.isBefore(path, from)
        );
    };
}

function collectNextSiblingsWhileMatching(
    editor: SlateEditor,
    current: Path,
    match: (node: Node, path: Path) => boolean,
): Path[] {
    if (current.length === 0) return [];

    const children = NodeApi.children(editor, PathApi.parent(current));
    const siblingsAfter = Array.from(children).filter(([, path]) => PathApi.isAfter(path, current));

    const matching: Path[] = [];

    for (const sibling of siblingsAfter) {
        if (!match(sibling[0], sibling[1])) {
            matching.push(sibling[1]);
            continue;
        }
        break;
    }

    return matching;
}
