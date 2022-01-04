import { isParagraphNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';

import { isNodeEmpty } from './isNodeEmpty';

export function isEmptyParagraphElement(editor: Editor, node?: Node | null): boolean {
    if (!isParagraphNode(node) || !node) {
        return false;
    }

    return isNodeEmpty(editor, node);
}
