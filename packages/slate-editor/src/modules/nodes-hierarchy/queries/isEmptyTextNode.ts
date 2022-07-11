import { Text } from 'slate';
import type { Node } from 'slate';

export function isEmptyTextNode(node: Node) {
    return Text.isText(node) && node.text === '';
}
