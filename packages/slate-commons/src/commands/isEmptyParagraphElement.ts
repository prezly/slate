import { isParagraphNode } from '@prezly/slate-types';
import type { Node, SlateEditor } from '@udecode/plate';

import { isNodeEmpty } from './isNodeEmpty';

export function isEmptyParagraphElement(
    editor: SlateEditor,
    node?: Node | null,
    trim = false,
): boolean {
    return isParagraphNode(node) && isNodeEmpty(editor, node, trim);
}
