import type { Range, Editor } from 'slate';
import { Node, Text } from 'slate';

export function isValidSelection(editor: Editor, selection: Range): false | true | 'fixable' {
    try {
        const anchor = Node.get(editor, selection.anchor.path);
        const focus = Node.get(editor, selection.focus.path);

        if (Text.isText(anchor) && Text.isText(focus)) {
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

export function fixSelection(editor: Editor, selection: Range): Range | null {
    try {
        const anchor = Node.get(editor, selection.anchor.path);
        const focus = Node.get(editor, selection.focus.path);

        if (Text.isText(anchor) && Text.isText(focus)) {
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
