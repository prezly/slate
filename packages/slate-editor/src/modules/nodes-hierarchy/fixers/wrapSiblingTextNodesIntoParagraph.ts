import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry, NodeMatch } from 'slate';
import { Node, Path, Text } from 'slate';

export function wrapSiblingTextNodesIntoParagraph(
    editor: SlateEditor,
    [node, path]: NodeEntry,
): boolean {
    if (!Text.isText(node)) return false;
    if (path.length === 0) return false;

    const combinePaths = [path, ...collectNextSiblingsWhileMatching(editor, path, Text.isText)];

    const from = combinePaths[0];
    const to = combinePaths[combinePaths.length - 1];

    editor.wrapNodes(editor.createDefaultTextBlock({ children: [] }), {
        at: Path.parent(path),
        match: betweenPaths(from, to),
    });

    return true;
}

function betweenPaths(from: Path, to: Path): NodeMatch<Node> {
    return (_, path) => {
        return (
            Path.equals(path, from) ||
            Path.isAfter(path, from) ||
            Path.equals(path, to) ||
            Path.isBefore(path, from)
        );
    };
}

function collectNextSiblingsWhileMatching(
    editor: SlateEditor,
    current: Path,
    match: NodeMatch<Node>,
): Path[] {
    if (current.length === 0) return [];

    // @ts-expect-error TODO: Fix this
    const siblingsAfter = Array.from(Node.children(editor, Path.parent(current))).filter(
        ([, path]) => Path.isAfter(path, current),
    );

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
