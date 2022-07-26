import { Text, Transforms } from 'slate';
import type { Editor, NodeEntry } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

export function convertToParagraph(editor: Editor, [node, path]: NodeEntry) {
    if (Text.isText(node)) {
        Transforms.wrapNodes(editor, createParagraph(), { at: path });
        return true;
    }

    Transforms.setNodes(editor, createParagraph({}), {
        at: path,
    });

    return true;
}
