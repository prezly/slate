import type { SlateEditor, TNodeEntry } from '@udecode/plate-common';

import { isTextualNode } from '../queries';

import { unwrapNode } from './unwrapNode';

export function unwrapImageNodeChild(editor: SlateEditor, entry: TNodeEntry) {
    return unwrapNode(editor, entry, ([node]) => isTextualNode(node));
}
