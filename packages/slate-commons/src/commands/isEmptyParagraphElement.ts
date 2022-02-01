import { isParagraphNode } from '@prezly/slate-types';
import { Node } from 'slate';

interface Options {
    ignoreWhitespace?: boolean;
}

export function isEmptyParagraphElement(node?: Node | null, options?: Options): boolean {
    if (!isParagraphNode(node) || !node) {
        return false;
    }

    if (options?.ignoreWhitespace) {
        return Node.string(node).trim() === '';
    }

    return Node.string(node) === '';
}
