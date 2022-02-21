import type { Descendant } from 'slate';
import { Text } from 'slate';

import { isLoaderElement } from '../lib';

export function withoutLoaderBlocks<T extends Descendant>(nodes: T[]): T[] {
    return nodes
        .map((node: T): T | null => {
            if (Text.isText(node)) {
                return node;
            }
            if (isLoaderElement(node)) {
                return null;
            }
            return { ...node, children: withoutLoaderBlocks(node.children) };
        })
        .filter((node: T | null): node is T => node !== null);
}
