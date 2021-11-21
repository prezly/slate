import type { Extension } from '@prezly/slate-commons';
import type { Descendant } from 'slate';

import deserializeHtmlToMarks from './deserializeHtmlToMarks';
import replaceCarriageReturnWithLineFeed from './replaceCarriageReturnWithLineFeed';
import temporarilyReplaceNode from './temporarilyReplaceNode';

const deserializeText =
    (extensions: Extension[]) =>
    (node: Text): Descendant[] | null => {
        if (!node.textContent) {
            return null;
        }

        // Temporarily wrap text node into a <span> so that deserializeHtmlToMarks
        // can run leaf deserializations on it. This is to handle situations where a text node
        // is not a child of a leaf node (e.g. Link).
        const span = document.createElement('span');
        span.appendChild(node.cloneNode(true));
        const { restore } = temporarilyReplaceNode(node, span);

        const result = deserializeHtmlToMarks(extensions)(span, [
            replaceCarriageReturnWithLineFeed(node.textContent),
        ]);

        restore();

        return result;
    };

export default deserializeText;
