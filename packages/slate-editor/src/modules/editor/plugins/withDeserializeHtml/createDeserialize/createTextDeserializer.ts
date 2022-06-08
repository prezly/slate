import type { Text } from 'slate';

import type { HTMLText } from './dom';
import { replaceCarriageReturnWithLineFeed } from './replaceCarriageReturnWithLineFeed';

export type TextDeserializer = (node: HTMLText) => Text[];

export function createTextDeserializer(): TextDeserializer {
    return function (node) {
        // Cleanup
        const text = replaceCarriageReturnWithLineFeed(node.textContent ?? '');

        if (text) {
            return [{ text }];
        }

        return [];
    };
}
