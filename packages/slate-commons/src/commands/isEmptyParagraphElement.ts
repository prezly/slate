import { isParagraphNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Node } from 'slate';

import { isNodeEmpty } from './isNodeEmpty';

export function isEmptyParagraphElement(editor: SlateEditor, node?: Node | null, trim = false): boolean {
    return isParagraphNode(node) && isNodeEmpty(editor, node, trim);
}
