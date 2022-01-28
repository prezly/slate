import { isParagraphNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';

import type { IsNodeEmptyOptions } from './isNodeEmpty';
import { isNodeEmpty } from './isNodeEmpty';

export interface IsEmptyParagraphElementOptions {
    shouldTrim?: IsNodeEmptyOptions['shouldTrim'];
}

export function isEmptyParagraphElement(
    editor: Editor,
    node?: Node | null,
    options?: IsEmptyParagraphElementOptions,
): boolean {
    if (!isParagraphNode(node) || !node) {
        return false;
    }

    return isNodeEmpty(editor, node, options);
}
