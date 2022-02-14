import { ReactEditor, useSlate } from 'slate-react';
import type { Node } from 'slate';

export function useSlateDom(node?: Node): HTMLElement | null {
    const editor = useSlate();
    try {
        return ReactEditor.toDOMNode(editor, node || editor);
    } catch {
        return null;
    }
}
