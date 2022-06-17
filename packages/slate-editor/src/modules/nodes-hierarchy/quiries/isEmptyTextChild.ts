import { Text } from 'slate';
import type { NodeEntry } from 'slate';

export function isEmptyTextChild([node]: NodeEntry) {
    return Text.isText(node) && node.text === '';
}
