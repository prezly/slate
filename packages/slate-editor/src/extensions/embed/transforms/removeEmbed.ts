import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { EmbedNode } from '../EmbedNode';

export function removeEmbed(editor: Editor, element?: EmbedNode): EmbedNode | null {
    return EditorCommands.removeNode<EmbedNode>(editor, {
        match: (node) => {
            if (EmbedNode.isEmbedNode(node)) {
                return element ? element.uuid === node.uuid : true;
            }
            return false;
        },
    });
}
