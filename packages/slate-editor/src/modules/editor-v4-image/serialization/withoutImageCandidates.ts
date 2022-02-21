import type { Descendant } from 'slate';
import { Text } from 'slate';

import { isImageCandidateElement } from '../lib';

export function withoutImageCandidates<T extends Descendant>(nodes: T[]): T[] {
    return nodes
        .map((node: T): T | null => {
            if (Text.isText(node)) {
                return node;
            }
            if (isImageCandidateElement(node)) {
                return null;
            }
            return { ...node, children: withoutImageCandidates(node.children) };
        })
        .filter((node: T | null): node is T => node !== null);
}
