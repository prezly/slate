import { Text } from 'slate';
import type { NodeEntry } from 'slate';

export function isTextNode([node]: NodeEntry) {
    return Text.isText(node);
}
