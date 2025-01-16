import { type Descendant, type Node, NodeApi, type NodeEntry, type Path } from '@udecode/plate';

export function findDescendants<N extends Node>(
    node: N,
    match: (descendant: Descendant, path: Path) => boolean,
): NodeEntry[] {
    const descendants = Array.from(NodeApi.descendants(node));
    return descendants.filter(([element, path]) => match(element, path));
}
