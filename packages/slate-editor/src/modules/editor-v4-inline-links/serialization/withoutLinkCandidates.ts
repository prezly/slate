import type { Descendant } from 'slate';
import { Text } from 'slate';

import { isLinkCandidateNode } from '../lib';

export function withoutLinkCandidates<T extends Descendant>(nodes: T[]): T[] {
    return nodes
        .map((node: T): T | null => {
            if (Text.isText(node)) {
                return node;
            }
            if (isLinkCandidateNode(node)) {
                return null;
            }
            return { ...node, children: withoutLinkCandidates(node.children) };
        })
        .filter((node: T | null): node is T => node !== null);
}
