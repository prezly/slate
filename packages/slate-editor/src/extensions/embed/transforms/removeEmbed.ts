import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { EmbedNode } from '../EmbedNode';

export function removeEmbed(editor: Editor): EmbedNode | null {
    return EditorCommands.removeNode<EmbedNode>(editor, {
        match: EmbedNode.isEmbedNode,
    });
}
