import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

export function rootNodeOnly(editor: Editor, entry: NodeEntry<ElementNode>): boolean {
    return EditorCommands.normalizeNestedElement(editor, entry, disallowAnyParent);
}

function disallowAnyParent() {
    return false;
}
