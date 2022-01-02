import type { Descendant, NodeEntry, Path } from 'slate';
import { Node } from 'slate';

export function findDescendants<N extends Node>(
    node: N,
    match: (descendant: Descendant, path: Path) => boolean,
): NodeEntry[] {
    const descendants = Array.from(Node.descendants(node));
    return descendants.filter(([element, path]) => match(element, path));
}
