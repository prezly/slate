import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, ElementEntry } from 'slate';

export function rootNodeOnly(editor: Editor, entry: ElementEntry): boolean {
    return EditorCommands.normalizeNestedElement(editor, entry, disallowAnyParent);
}

function disallowAnyParent() {
    return false;
}
