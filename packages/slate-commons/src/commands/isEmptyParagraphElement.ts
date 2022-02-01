import { isParagraphNode } from '@prezly/slate-types';
import { Node } from 'slate';

interface Options {
    trim?: boolean;
}

export function isEmptyParagraphElement(node?: Node | null, options?: Options): boolean {
    if (!isParagraphNode(node) || !node) {
        return false;
    }

    if (options?.trim) {
        return Node.string(node).trim() === '';
    }

    return Node.string(node) === '';
}
