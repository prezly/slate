import { isParagraphNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';

import { isNodeEmpty } from './isNodeEmpty';

export function isEmptyParagraphElement(editor: Editor, node?: Node | null, trim = false): boolean {
    return isParagraphNode(node) && isNodeEmpty(editor, node, trim);
}
