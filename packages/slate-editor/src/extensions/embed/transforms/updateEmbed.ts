import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { EmbedNode } from '../EmbedNode';

export function updateEmbed(
    editor: Editor,
    element: EmbedNode,
    patch: Partial<Pick<EmbedNode, 'url' | 'oembed' | 'layout' | 'uuid'>>,
) {
    Transforms.setNodes<EmbedNode>(editor, patch, {
        at: [],
        match: (node) => EmbedNode.isEmbedNode(node) && node.uuid === element.uuid,
    });
}
