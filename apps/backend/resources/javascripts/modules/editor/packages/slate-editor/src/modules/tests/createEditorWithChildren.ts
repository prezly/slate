import type { Editor, Element } from 'slate';
import { createEditor } from 'slate';

export function createEditorWithChildren(children: Element[]): Editor {
    const editor = createEditor();
    editor.children = children;

    return editor;
}
