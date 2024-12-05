import { isLinkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Path, Range } from 'slate';

export function unwrapLink(editor: SlateEditor, selection?: Path | Range): void {
    editor.unwrapNodes({
        at: selection,
        match: isLinkNode,
        split: true,
    });
}
