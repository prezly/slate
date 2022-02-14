import type { Node } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

export function useSlateDom(node?: Node): HTMLElement | null {
    const editor = useSlate();
    try {
        return ReactEditor.toDOMNode(editor, node || editor);
    } catch {
        return null;
    }
}
