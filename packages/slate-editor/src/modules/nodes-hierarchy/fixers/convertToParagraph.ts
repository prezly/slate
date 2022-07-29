import { Transforms } from 'slate';
import type { Editor, NodeEntry } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

import { isInlineNode } from '../queries';

export function convertToParagraph(editor: Editor, [node, path]: NodeEntry) {
    if (isInlineNode(node)) {
        Transforms.wrapNodes(editor, createParagraph(), { at: path });
        return true;
    }

    Transforms.setNodes(editor, createParagraph({}), {
        at: path,
    });

    return true;
}
