import { isHeadingNode, isParagraphNode, isQuoteNode } from '@prezly/slate-types';
import type { TNode } from '@udecode/plate-common';

import { isInlineNode } from './isInlineNode';

export function isTextualNode(node: TNode) {
    return isInlineNode(node) || isParagraphNode(node) || isHeadingNode(node) || isQuoteNode(node);
}
