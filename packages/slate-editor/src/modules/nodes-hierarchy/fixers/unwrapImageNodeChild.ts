import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

import { isTextualNode } from '../queries';

import { unwrapNode } from './unwrapNode';

export function unwrapImageNodeChild(editor: SlateEditor, entry: NodeEntry) {
    return unwrapNode(editor, entry, ([node]) => isTextualNode(node));
}
