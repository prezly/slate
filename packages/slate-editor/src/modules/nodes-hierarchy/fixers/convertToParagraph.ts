import { Text, Transforms } from 'slate';
import type { Editor, Descendant, NodeEntry } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

export function convertToParagraph(editor: Editor, [node, path]: NodeEntry) {
    if (Text.isText(node)) {
        Transforms.wrapNodes(editor, createParagraph(), { at: path });
        return true;
    }

    let children: Descendant[] = [];

    if ('children' in node) {
        children = node.children;
    } else if (Text.isText(node)) {
        children.push(node);
    }

    if (children.length === 0) {
        children.push({ text: '' });
    }

    Transforms.setNodes(editor, createParagraph({ children }), {
        at: path,
    });

    return true;
}
