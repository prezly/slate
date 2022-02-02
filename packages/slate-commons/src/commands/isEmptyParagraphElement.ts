import { isParagraphNode } from '@prezly/slate-types';
import { Editor, Node, Text } from 'slate';

interface Options {
    trim?: boolean;
}

export function isEmptyParagraphElement(
    editor: Editor,
    node?: Node | null,
    options?: Options,
): boolean {
    if (!isParagraphNode(node) || !node) {
        return false;
    }

    if (hasVoidElements(editor, node)) {
        return false;
    }

    if (options?.trim) {
        return Node.string(node).trim() === '';
    }

    return Node.string(node) === '';
}

function hasVoidElements(editor: Editor, node: Node): boolean {
    if (Text.isText(node)) {
        return false;
    }
    if (Editor.isEditor(node)) {
        return node.children.some((child) => hasVoidElements(editor, child));
    }
    if (editor.isVoid(node)) {
        return false;
    }
    return node.children.some((child) => hasVoidElements(editor, child));
}
