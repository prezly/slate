import { EditorCommands } from '@prezly/slate-commons';
import { EmbedNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeEmbed(editor: Editor): EmbedNode | null {
    return EditorCommands.removeNode<EmbedNode>(editor, {
        match: EmbedNode.isEmbedNode,
    });
}
