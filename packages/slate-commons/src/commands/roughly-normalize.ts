import { isNotNull } from '@technically/is-not-null';
import type { Editor, Node } from 'slate';

/**
 * Enforce Slate's built-in constraints on nodes being inserted,
 * otherwise, Slate hard-fails when trying to process them.
 *
 * @see https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
 * @see CARE-1320
 */
export function roughlyNormalizeValue<TopLevelNode extends Editor['children'][number]>(
    editor: Editor,
    value: TopLevelNode[],
): TopLevelNode[] {
    return roughlyNormalizeNodes<TopLevelNode>(editor, value);
}

/**
 * Enforce Slate's built-in constraints on nodes being inserted,
 * otherwise, Slate hard-fails when trying to process them.
 *
 * @see https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
 * @see CARE-1320
 */
export function roughlyNormalizeNodes<T extends Node>(editor: Editor, nodes: T[]): T[] {
    const normalized = nodes.map((node) => roughlyNormalizeNode(editor, node)).filter(isNotNull);

    return isShallowEqual(normalized, nodes) ? nodes : normalized;
}

/**
 * Enforce Slate's built-in constraints on nodes being inserted,
 * otherwise, Slate hard-fails when trying to process them.
 *
 * @see https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
 * @see CARE-1320
 */
export function roughlyNormalizeNode<T extends Node>(editor: Editor, node: T): T | null {
    if ('text' in node) {
        return node; // as is
    }

    if ('children' in node) {
        const children = Array.isArray(node.children)
            ? roughlyNormalizeNodes(editor, node.children)
            : [];

        if (children.length > 0) {
            return node.children === children ? node : { ...node, children };
        }
    }

    // append the most empty `children` array
    return { ...node, children: [{ text: '' }] };
}

function isShallowEqual<T>(array: T[], another: T[]): boolean {
    return array.length === another.length && array.every((item, idx) => another[idx] === item);
}
