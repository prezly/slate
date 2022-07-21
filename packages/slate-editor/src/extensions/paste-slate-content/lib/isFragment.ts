import { Node} from 'slate';

export type Fragment = Node[];

/**
 * Checks recursively whether all members of the fragment are Nodes.
 * It does not validate schema/hierarchy.
 */
export function isFragment(value: unknown): value is Fragment {
    if (!Node.isNodeList(value)) {
        return false;
    }

    return value.length > 0 && value.every(Node.isNode);
}
