import { Editor, Path, Text } from 'slate';

import { isVoid } from './isVoid';

export function getPrevChars(editor: Editor, length: number): string {
    const selection = editor.selection;

    if (!selection) {
        return '';
    }

    const { focus } = selection;
    let text = Editor.string(editor, { focus, anchor: { path: focus.path, offset: 0 } });

    if (text.length > length) {
        return text.slice(-length);
    }

    const start = { path: [...Path.parent(focus.path), 0], offset: 0 };

    const nodes = Editor.nodes(editor, {
        mode: 'lowest',
        at: { anchor: start, focus },
        reverse: true,
    });

    for (const [node, path] of nodes) {
        if (Path.equals(path, focus.path)) {
            continue;
        }

        if (isVoid(editor, node)) {
            break;
        }

        if (Text.isText(node)) {
            text = `${node.text}${text}`;
        }

        if (text.length >= length) {
            break;
        }
    }

    return text.slice(-length);
}
