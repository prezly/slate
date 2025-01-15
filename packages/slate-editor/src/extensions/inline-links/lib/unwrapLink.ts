import { isLinkNode } from '@prezly/slate-types';
import type { Path, Range, SlateEditor } from '@udecode/plate';

export function unwrapLink(editor: SlateEditor, selection?: Path | Range): void {
    editor.tf.unwrapNodes({
        at: selection,
        match: isLinkNode,
        split: true,
    });
}
