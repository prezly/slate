import type { TNode } from '@udecode/plate-common';
import { isText } from '@udecode/plate-common';

export function isEmptyTextNode(node: TNode) {
    return isText(node) && node.text === '';
}
