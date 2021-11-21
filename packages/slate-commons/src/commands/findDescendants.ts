import type { Descendant, NodeEntry, Path } from 'slate';
import { Node } from 'slate';

const findDescendants = <N extends Node>(
    node: N,
    match: (descendant: Descendant, path: Path) => boolean,
): NodeEntry[] => {
    const descendants = Array.from(Node.descendants(node));
    const matchingDescendants = descendants.filter(([element, path]) => match(element, path));
    return matchingDescendants;
};

export default findDescendants;
