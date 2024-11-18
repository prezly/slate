import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

import { isInlineNode } from '../queries';

export function convertToParagraph(editor: SlateEditor, [node, path]: NodeEntry) {
    if (isInlineNode(node)) {
        editor.wrapNodes(createParagraph(), { at: path });
        return true;
    }

    editor.setNodes(createParagraph({}), {
        at: path,
    });

    return true;
}
