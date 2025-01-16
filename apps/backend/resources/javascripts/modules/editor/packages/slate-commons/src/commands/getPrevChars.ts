import { PathApi, TextApi, type SlateEditor } from '@udecode/plate';

import { isVoid } from './isVoid';

export function getPrevChars(editor: SlateEditor, length: number): string {
    const selection = editor.selection;

    if (!selection) {
        return '';
    }

    const { focus } = selection;
    let text = editor.api.string({ focus, anchor: { path: focus.path, offset: 0 } });

    if (text.length > length) {
        return text.slice(-length);
    }

    const start = { path: [...PathApi.parent(focus.path), 0], offset: 0 };

    const nodes = editor.api.nodes({
        mode: 'lowest',
        at: { anchor: start, focus },
        reverse: true,
    });

    for (const [node, path] of nodes) {
        if (PathApi.equals(path, focus.path)) {
            continue;
        }

        if (isVoid(editor, node)) {
            break;
        }

        if (TextApi.isText(node)) {
            text = `${node.text}${text}`;
        }

        if (text.length >= length) {
            break;
        }
    }

    return text.slice(-length);
}
