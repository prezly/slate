import type { NodeEntry, Editor } from 'slate';

import { isTextualNode } from '../queries';

import { unwrapNode } from './unwrapNode';

export function unwrapImageNodeChild(editor: Editor, entry: NodeEntry) {
    return unwrapNode(editor, entry, ([node]) => isTextualNode(node));
}
