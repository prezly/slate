import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { isTextualNode } from '../queries';

import { unwrapNode } from './unwrapNode';

export function unwrapImageNodeChild(editor: SlateEditor, entry: NodeEntry) {
    return unwrapNode(editor, entry, ([node]) => isTextualNode(node));
}
