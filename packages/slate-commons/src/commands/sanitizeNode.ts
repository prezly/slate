import type { Node } from 'slate';

/**
 * Enforce Slate's built-in constraints on nodes being inserted,
 * otherwise, Slate hard-fails when trying to process them.
 *
 * @see https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
 * @see CARE-1320
 */
export function sanitizeNode<T extends Node>(node: T): T {
    if ('text' in node) {
        return node; // as is
    }

    if ('children' in node) {
        if (Array.isArray(node.children)) {
            if (node.children.length === 0) {
                return {
                    ...node,
                    children: [{ text: '' }],
                };
            }

            return {
                ...node,
                children: node.children.map(sanitizeNode),
            };
        }
    }

    return {
        ...node,
        children: [{ text: '' }],
    };
}
