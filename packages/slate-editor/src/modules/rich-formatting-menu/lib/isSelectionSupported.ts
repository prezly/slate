import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode, isQuoteNode } from '@prezly/slate-types';
import { Editor, Element } from 'slate';

import { isRichTextElement } from '#extensions/rich-formatting';

export function isSelectionSupported(editor: Editor): boolean {
    if (EditorCommands.isSelectionEmpty(editor)) {
        return false;
    }

    const nodeEntries = Array.from(
        Editor.nodes<Element>(editor, {
            match: (node) => Element.isElement(node),
        }),
    );

    return nodeEntries.every(
        ([node]) => isRichTextElement(node) || isLinkNode(node) || isQuoteNode(node),
    );
}
