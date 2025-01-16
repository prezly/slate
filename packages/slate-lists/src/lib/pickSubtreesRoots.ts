import { type NodeEntry, PathApi } from '@udecode/plate';

/**
 * Will return a minimal subset of the given nodes that includes the rest of the given nodes as descendants.
 *
 * Example:
 *           ROOT
 *         /     \
 *        /       \
 *       A         B
 *     / | \     / | \
 *    A1 A2 A3  B1 B2 B3
 *   /       \         \
 *  A11      A31       B31
 *
 * A is the subtree root that includes every other node:
 * - pickSubtreesRoots([A, A1, A2, A3, A31]) === [A]
 *
 * A and B1 are the subtree roots that include every other node:
 * - pickSubtreesRoots([A, A1, A2, A3, A31, B1]) === [A, B1]
 *
 * A, B1, B2, and B3 are the subtree roots that include every other node:
 * - pickSubtreesRoots([A, A1, A2, A3, A31, B1, B2, B3, B31]) === [A, B1, B2, B3]
 *
 * A and B are the subtree roots that include every other node:
 * - pickSubtreesRoots([A, A1, A2, A3, A31, B, B1, B2, B3, B31]) === [A, B]
 */
export function pickSubtreesRoots(entries: NodeEntry[]): NodeEntry[] {
    return entries.filter(([, nodePath]) => {
        const ancestors = PathApi.ancestors(nodePath);

        return !ancestors.some((ancestor) => {
            return entries.some(([, path]) => PathApi.equals(path, ancestor));
        });
    });
}
