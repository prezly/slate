import type { Text } from 'slate';

import type { HTMLText } from './dom';

export type TextDeserializer = (node: HTMLText) => Text[];

export function createTextDeserializer(cleanup: (text: string) => string): TextDeserializer {
    return function (node) {
        // Cleanup
        const text = cleanup(node.textContent ?? '');

        if (text) {
            return [{ text }];
        }

        return [];
    };
}
