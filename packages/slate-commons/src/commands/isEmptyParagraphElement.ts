import { isParagraphNode } from '@prezly/slate-types';
import { Node } from 'slate';
import type { Editor } from 'slate';

import { isNodeEmpty } from './isNodeEmpty';

interface Options {
    shouldTrim?: boolean;
}

export function isEmptyParagraphElement(
    editor: Editor,
    node?: Node | null,
    options?: Options,
): boolean {
    if (!isParagraphNode(node) || !node) {
        return false;
    }

    let nodeEmpty = isNodeEmpty(editor, node);

    if (options?.shouldTrim && nodeEmpty === false) {
        const str = Node.string(node);
        nodeEmpty = nodeEmpty || Boolean(str.length && str.trim() === '');
    }

    return nodeEmpty;
}
