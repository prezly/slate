import { isHeadingNode, isParagraphNode } from '@prezly/slate-types';
import type { Node } from 'slate';

import { isInlineNode } from './isInlineNode';

export function isTextualNode(node: Node) {
    return isInlineNode(node) || isParagraphNode(node) || isHeadingNode(node);
}
