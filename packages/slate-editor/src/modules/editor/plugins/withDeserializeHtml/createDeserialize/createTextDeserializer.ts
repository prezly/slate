import type { Descendant } from 'slate';

import type { MarksDeserializer } from './createMarksDeserializer';
import { replaceCarriageReturnWithLineFeed } from './replaceCarriageReturnWithLineFeed';
import { temporarilyReplaceNode } from './temporarilyReplaceNode';

export type TextDeserializer = (node: Text) => Descendant[] | null;

export function createTextDeserializer(deserializeMarks: MarksDeserializer): TextDeserializer {
    return function (node: Text): Descendant[] | null {
        if (!node.textContent) {
            return null;
        }

        // Temporarily wrap text node into a <span> so that deserializeHtmlToMarks
        // can run leaf deserializations on it. This is to handle situations where a text node
        // is not a child of a leaf node (e.g. Link).
        const span = document.createElement('span');
        span.appendChild(node.cloneNode(true));
        const { restore } = temporarilyReplaceNode(node, span);

        const result = deserializeMarks(span, [
            replaceCarriageReturnWithLineFeed(node.textContent),
        ]);

        restore();

        return result;
    };
}
