import type { Node } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

export function useSlateDom(node?: Node | null): HTMLElement | null {
    const editor = useSlate();

    if (node === null) {
        return null;
    }

    try {
        return ReactEditor.toDOMNode(editor, node || editor);
    } catch {
        return null;
    }
}
