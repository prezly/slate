import { Text } from 'slate';
import type { NodeEntry } from 'slate';

export function isEmptyTextNode([node]: NodeEntry) {
    return Text.isText(node) && node.text === '';
}
