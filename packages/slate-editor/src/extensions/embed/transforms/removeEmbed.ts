import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';

import { EmbedNode } from '../EmbedNode';

export function removeEmbed(editor: SlateEditor, element?: EmbedNode): EmbedNode | null {
    return EditorCommands.removeNode<EmbedNode>(editor, {
        match: (node) => {
            if (EmbedNode.isEmbedNode(node)) {
                return element ? element.uuid === node.uuid : true;
            }
            return false;
        },
    });
}
