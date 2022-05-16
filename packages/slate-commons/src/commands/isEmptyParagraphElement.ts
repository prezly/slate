import { isParagraphNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';

import { isNodeEmpty } from './isNodeEmpty';

interface Options {
    trim?: boolean;
}

export function isEmptyParagraphElement(
    editor: Editor,
    node?: Node | null,
    options?: Options,
): boolean {
    return isParagraphNode(node) && isNodeEmpty(editor, node, options?.trim ?? false);
}
