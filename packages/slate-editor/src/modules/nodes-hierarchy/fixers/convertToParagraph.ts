import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { createParagraph } from '#extensions/paragraphs';

import { isInlineNode } from '../queries';

export function convertToParagraph(editor: SlateEditor, [node, path]: NodeEntry) {
    if (isInlineNode(node)) {
        editor.tf.wrapNodes(createParagraph(), { at: path });
        return true;
    }

    editor.tf.setNodes(createParagraph({}), {
        at: path,
    });

    return true;
}
