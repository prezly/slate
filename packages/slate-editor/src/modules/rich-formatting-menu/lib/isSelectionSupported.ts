import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Element } from 'slate';

import { findRichFormattingTextParent } from './findRichFormattingTextParent';

export function isSelectionSupported(editor: Editor): boolean {
    if (EditorCommands.isSelectionEmpty(editor)) {
        return false;
    }

    const nodeEntries = Array.from(
        Editor.nodes<Element>(editor, {
            match: (node) => Element.isElement(node),
            mode: 'lowest',
        }),
    );

    // Every selected element is either formattable, or a child of a formattable element
    return nodeEntries.every((entry) => Boolean(findRichFormattingTextParent(editor, entry)));
}
