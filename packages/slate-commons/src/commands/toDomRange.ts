import type { SlateEditor } from '@udecode/plate-common';
import { toDOMRange } from '@udecode/slate-react';
import type { Range } from 'slate';

export function toDomRange(editor: SlateEditor, range: Range): globalThis.Range | null {
    return toDOMRange(editor, range) ?? null;
}
