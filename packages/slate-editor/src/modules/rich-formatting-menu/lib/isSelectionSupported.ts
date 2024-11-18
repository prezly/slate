import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import { Element } from 'slate';

import { findRichFormattingTextParent } from './findRichFormattingTextParent';

export function isSelectionSupported(editor: SlateEditor): boolean {
    if (EditorCommands.isSelectionEmpty(editor)) {
        return false;
    }

    const nodeEntries = Array.from(
        editor.nodes<Element>({
            match: (node) => Element.isElement(node),
            mode: 'lowest',
        }),
    );

    // Every selected element is either formattable, or a child of a formattable element
    return nodeEntries.every((entry) => Boolean(findRichFormattingTextParent(editor, entry)));
}
