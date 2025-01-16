import { NodeApi, type Descendant } from '@udecode/plate';

export type Fragment = Descendant[];

/**
 * Checks recursively whether all members of the fragment are Nodes.
 * It does not validate schema/hierarchy.
 */
export function isFragment(value: unknown): value is Fragment {
    if (!NodeApi.isNodeList(value)) {
        return false;
    }

    return value.length > 0 && value.every(NodeApi.isNode);
}
