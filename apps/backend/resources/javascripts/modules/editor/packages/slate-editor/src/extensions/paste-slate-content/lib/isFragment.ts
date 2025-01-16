import { isNode, isNodeList, type TDescendant } from '@udecode/plate-common';

export type Fragment = TDescendant[];

/**
 * Checks recursively whether all members of the fragment are Nodes.
 * It does not validate schema/hierarchy.
 */
export function isFragment(value: unknown): value is Fragment {
    if (!isNodeList(value)) {
        return false;
    }

    return value.length > 0 && value.every(isNode);
}
