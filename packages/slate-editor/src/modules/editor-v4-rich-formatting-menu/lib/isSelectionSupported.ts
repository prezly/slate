import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import { Editor, Element } from 'slate';

import { isRichTextElement } from '#extensions/editor-v4-rich-formatting';

export function isSelectionSupported(editor: Editor): boolean {
    if (EditorCommands.isSelectionEmpty(editor)) {
        return false;
    }

    const nodeEntries = Array.from(
        Editor.nodes<Element>(editor, {
            match: (node) => Element.isElement(node),
        }),
    );

    return nodeEntries.every(([node]) => isRichTextElement(node) || isLinkNode(node));
}
