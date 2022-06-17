import { Text } from 'slate';
import type { NodeEntry } from 'slate';

export function isPlainText([node]: NodeEntry) {
    return Text.isText(node);
}
