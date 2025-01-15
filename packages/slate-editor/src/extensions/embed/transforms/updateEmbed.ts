import type { SlateEditor } from '@udecode/plate';

import { EmbedNode } from '../EmbedNode';

export function updateEmbed(
    editor: SlateEditor,
    element: EmbedNode,
    patch: Partial<Pick<EmbedNode, 'url' | 'oembed' | 'layout' | 'uuid'>>,
) {
    editor.tf.setNodes<EmbedNode>(patch, {
        at: [],
        match: (node) => EmbedNode.isEmbedNode(node) && node.uuid === element.uuid,
    });
}
