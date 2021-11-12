import { createEditor, Editor, Element } from 'slate';

export function createEditorWithChildren(children: Element[]): Editor {
    const editor = createEditor();
    editor.children = children;

    return editor;
}
