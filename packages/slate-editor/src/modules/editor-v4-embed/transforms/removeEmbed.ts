import { EditorCommands } from '@prezly/slate-commons';
import type { EmbedNode } from '@prezly/slate-types';
import { isEmbedNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

function removeEmbed(editor: Editor): EmbedNode | null {
    return EditorCommands.removeNode<EmbedNode>(editor, {
        match: isEmbedNode,
    });
}

export default removeEmbed;
