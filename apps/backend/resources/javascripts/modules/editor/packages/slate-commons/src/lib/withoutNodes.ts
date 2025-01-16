import { type Node, TextApi } from '@udecode/plate';

export function withoutNodes<T extends Node>(nodes: T[], match: (node: Node) => boolean): T[] {
    return nodes
        .map((node: T): T | null => {
            if (match(node)) {
                return null;
            }
            if (TextApi.isText(node)) {
                return node;
            }
            return { ...node, children: withoutNodes(node.children, match) };
        })
        .filter((node: T | null): node is T => node !== null);
}
