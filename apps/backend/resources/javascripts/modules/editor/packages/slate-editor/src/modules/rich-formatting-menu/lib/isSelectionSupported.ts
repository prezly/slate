import { EditorCommands } from '@prezly/slate-commons';
import { ElementApi, type SlateEditor } from '@udecode/plate';

import { findRichFormattingTextParent } from './findRichFormattingTextParent';

export function isSelectionSupported(editor: SlateEditor): boolean {
    if (EditorCommands.isSelectionEmpty(editor)) {
        return false;
    }

    const nodeEntries = Array.from(
        editor.api.nodes({
            match: (node) => ElementApi.isElement(node),
            mode: 'lowest',
        }),
    );

    // Every selected element is either formattable, or a child of a formattable element
    return nodeEntries.every((entry) => Boolean(findRichFormattingTextParent(editor, entry)));
}
