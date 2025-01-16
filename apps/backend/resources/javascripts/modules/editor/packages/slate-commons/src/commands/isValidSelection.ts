import { type Range, type SlateEditor, TextApi } from '@udecode/plate';

export function isValidSelection(editor: SlateEditor, selection: Range): false | true | 'fixable' {
    try {
        const anchor = editor.api.node(selection.anchor.path);
        const focus = editor.api.node(selection.focus.path);

        if (TextApi.isText(anchor) && TextApi.isText(focus)) {
            if (
                selection.anchor.offset > anchor.text.length ||
                selection.focus.offset > focus.text.length
            ) {
                return 'fixable';
            }
            return true;
        }
    } catch {
        return false;
    }
    return true;
}

export function fixSelection(editor: SlateEditor, selection: Range): Range | null {
    try {
        const anchor = editor.api.node(selection.anchor.path);
        const focus = editor.api.node(selection.focus.path);

        if (TextApi.isText(anchor) && TextApi.isText(focus)) {
            return {
                anchor: {
                    ...selection.anchor,
                    offset: Math.min(anchor.text.length, selection.anchor.offset),
                },
                focus: {
                    ...selection.focus,
                    offset: Math.min(focus.text.length, selection.anchor.offset),
                },
            };
        }
    } catch {
        return null;
    }

    return null;
}
