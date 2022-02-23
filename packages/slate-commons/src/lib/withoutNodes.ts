import type { Descendant, Node} from 'slate';
import { Text } from 'slate';

export function withoutNodes<T extends Descendant>(nodes: T[], match: (node: Node) => boolean): T[] {
    return nodes
        .map((node: T): T | null => {
            if (Text.isText(node)) {
                return node;
            }
            if (match(node)) {
                return null;
            }
            return { ...node, children: withoutNodes(node.children, match) };
        })
        .filter((node: T | null): node is T => node !== null);
}
