import { Text, Transforms } from 'slate';
import type { Editor, Descendant, NodeEntry } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

export function convertToParagraph(editor: Editor, [node, path]: NodeEntry) {
    let children: Descendant[] = [];

    if ('children' in node) {
        children = node.children;
    } else if (Text.isText(node)) {
        children.push(node);
    }

    Transforms.setNodes(editor, createParagraph({ children }), {
        at: path,
    });

    return true;
}
