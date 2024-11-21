import type { SlateEditor, TNodeEntry } from '@udecode/plate-common';

import { createParagraph } from '#extensions/paragraphs';

import { isInlineNode } from '../queries';

export function convertToParagraph(editor: SlateEditor, [node, path]: TNodeEntry) {
    if (isInlineNode(node)) {
        editor.wrapNodes(createParagraph(), { at: path });
        return true;
    }

    editor.setNodes(createParagraph({}), {
        at: path,
    });

    return true;
}
