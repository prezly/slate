import type { Node, NodeEntry } from 'slate';
import { Path } from 'slate';

/**
 * Will return nodes that are not "reachable" (graph-wise) from any other node,
 * assuming one-way "parent" -> "child" relationship.
 * See: https://en.wikipedia.org/wiki/Reachability
 */
const getUnreachableAncestors = (nodeEntries: NodeEntry<Node>[]): NodeEntry<Node>[] =>
    nodeEntries.filter(([, nodePath]) => {
        const ancestors = Path.ancestors(nodePath);

        return !ancestors.some((ancestor) => {
            return nodeEntries.some(([, path]) => Path.equals(path, ancestor));
        });
    });

export default getUnreachableAncestors;
